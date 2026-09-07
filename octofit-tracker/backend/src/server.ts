import express from 'express';
import apiRoutes from './routes/api.js';
import './config/database.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());
app.use('/api', apiRoutes);

app.get('/', (_request, response) => {
  response.json({
    service: 'OctoFit Tracker API',
    status: 'ok',
    baseUrl,
    port,
    endpoints: [
      '/api/health',
      '/api/users',
      '/api/teams',
      '/api/activities',
      '/api/leaderboard',
      '/api/workouts',
    ],
  });
});

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    baseUrl,
    port,
  });
});

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
  console.log(`API base URL: ${baseUrl}`);
});
