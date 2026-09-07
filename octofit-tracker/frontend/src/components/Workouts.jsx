import { useEffect, useState } from 'react';

const apiBaseUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function Workouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadWorkouts() {
      try {
        const response = await fetch(`${apiBaseUrl}/workouts/`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const payload = await response.json();
        const workouts = Array.isArray(payload) ? payload : payload.results ?? [];
        setItems(workouts);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load workouts');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadWorkouts();
    return () => controller.abort();
  }, []);

  if (loading) return <p>Loading workouts...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <section className="container py-4">
      <h2>Workouts</h2>
      <ul className="list-group">
        {items.map((workout) => (
          <li key={workout._id ?? workout.title} className="list-group-item">
            <strong>{workout.title}</strong> — {workout.focus}
            <div className="text-muted">{workout.durationMinutes} min • {workout.difficulty}</div>
            <div>{workout.description}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Workouts;
