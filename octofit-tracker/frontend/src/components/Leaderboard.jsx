import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api.js';

function Leaderboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadLeaderboard() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/leaderboard/`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const payload = await response.json();
        const leaderboard = Array.isArray(payload) ? payload : payload.results ?? [];
        setItems(leaderboard);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load leaderboard');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadLeaderboard();
    return () => controller.abort();
  }, []);

  if (loading) return <p>Loading leaderboard...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <section className="container py-4">
      <h2>Leaderboard</h2>
      <ul className="list-group">
        {items.map((entry) => (
          <li key={entry._id ?? `${entry.userId}-${entry.rank}`} className="list-group-item">
            <strong>#{entry.rank ?? 1}</strong> {entry.name} — {entry.score ?? 0} pts
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Leaderboard;
