import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api.js';

function Activities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadActivities() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/activities/`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const payload = await response.json();
        const activities = Array.isArray(payload) ? payload : payload.results ?? [];
        setItems(activities);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load activities');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadActivities();
    return () => controller.abort();
  }, []);

  if (loading) return <p>Loading activities...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <section className="container py-4">
      <h2>Activities</h2>
      <ul className="list-group">
        {items.map((activity) => (
          <li key={activity._id ?? `${activity.userId}-${activity.type}`} className="list-group-item">
            <strong>{activity.type}</strong> — {activity.durationMinutes} min
            <div className="text-muted">Calories: {activity.caloriesBurned ?? 0}</div>
            <div>{activity.notes || 'No notes provided.'}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Activities;
