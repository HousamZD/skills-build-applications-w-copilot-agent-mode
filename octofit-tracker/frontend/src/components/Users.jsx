import { useEffect, useState } from 'react';

const apiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

function Users() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadUsers() {
      try {
        const response = await fetch(apiUrl, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const payload = await response.json();
        const users = Array.isArray(payload) ? payload : payload.results ?? [];
        setItems(users);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load users');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadUsers();
    return () => controller.abort();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <section className="container py-4">
      <h2>Users</h2>
      <ul className="list-group">
        {items.map((user) => (
          <li key={user._id ?? user.email ?? user.name} className="list-group-item">
            <strong>{user.name}</strong> — {user.role} ({user.age} yrs)
            <div className="text-muted">{user.email}</div>
            <div>Fitness score: {user.fitnessScore ?? 0}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Users;
