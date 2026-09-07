import { Router } from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const router = Router();

const notFoundMessage = (resource: string) => `${resource} not found`;

router.get('/users', async (_req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
});

router.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create user', error });
  }
});

router.get('/teams', async (_req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teams', error });
  }
});

router.post('/teams', async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create team', error });
  }
});

router.get('/activities', async (_req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch activities', error });
  }
});

router.post('/activities', async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create activity', error });
  }
});

router.get('/leaderboard', async (_req, res) => {
  try {
    const leaderboard = await LeaderboardEntry.find().sort({ score: -1, createdAt: 1 });
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leaderboard', error });
  }
});

router.post('/leaderboard', async (req, res) => {
  try {
    const entry = await LeaderboardEntry.create(req.body);
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create leaderboard entry', error });
  }
});

router.get('/workouts', async (_req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch workouts', error });
  }
});

router.post('/workouts', async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create workout', error });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: notFoundMessage('User') });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch user', error });
  }
});

router.get('/teams/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: notFoundMessage('Team') });
    return res.json(team);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch team', error });
  }
});

router.get('/activities/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ message: notFoundMessage('Activity') });
    return res.json(activity);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch activity', error });
  }
});

router.get('/leaderboard/:id', async (req, res) => {
  try {
    const entry = await LeaderboardEntry.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: notFoundMessage('Leaderboard entry') });
    return res.json(entry);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch leaderboard entry', error });
  }
});

router.get('/workouts/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ message: notFoundMessage('Workout') });
    return res.json(workout);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch workout', error });
  }
});

export default router;
