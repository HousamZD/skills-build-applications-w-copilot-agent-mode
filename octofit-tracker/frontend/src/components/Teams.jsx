import { useEffect, useState } from 'react';

const apiBaseUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function Teams() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadTeams() {
      try {
        const response = await fetch(`${apiBaseUrl}/teams/`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const payload = await response.json();
        const teams = Array.isArray(payload) ? payload : payload.results ?? [];
        setItems(teams);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load teams');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadTeams();
    return () => controller.abort();
  }, []);

  if (loading) return <p>Loading teams...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <section className="container py-4">
      <h2>Teams</h2>
      <ul className="list-group">
        {items.map((team) => (
          <li key={team._id ?? team.name} className="list-group-item">
            <strong>{team.name}</strong>
            <div className="text-muted">Captain: {team.captain}</div>
            <div>Members: {team.members?.join(', ') || 'None'}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Teams;
