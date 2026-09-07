import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await LeaderboardEntry.deleteMany({});
    await Workout.deleteMany({});

    const users = await User.insertMany([
      {
        name: 'Ava Patel',
        email: 'ava.patel@mergington.edu',
        age: 16,
        role: 'student',
        fitnessScore: 94,
      },
      {
        name: 'Marcus Lee',
        email: 'marcus.lee@mergington.edu',
        age: 17,
        role: 'student',
        fitnessScore: 91,
      },
      {
        name: 'Sofia Ramirez',
        email: 'sofia.ramirez@mergington.edu',
        age: 15,
        role: 'student',
        fitnessScore: 88,
      },
      {
        name: 'Daniel Kim',
        email: 'daniel.kim@mergington.edu',
        age: 16,
        role: 'student',
        fitnessScore: 86,
      },
      {
        name: 'Ms. Chen',
        email: 'ms.chen@mergington.edu',
        age: 35,
        role: 'teacher',
        fitnessScore: 80,
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Trail Blazers',
        captain: users[0].name,
        members: users.slice(0, 3).map((user) => user.name),
        color: '#22c55e',
      },
      {
        name: 'Storm Riders',
        captain: users[1].name,
        members: users.slice(1, 4).map((user) => user.name),
        color: '#f59e0b',
      },
    ]);

    const activities = await Activity.insertMany([
      {
        userId: users[0]._id.toString(),
        type: 'Run',
        durationMinutes: 35,
        caloriesBurned: 420,
        notes: 'Morning interval run with strong speed work.',
      },
      {
        userId: users[1]._id.toString(),
        type: 'Strength',
        durationMinutes: 45,
        caloriesBurned: 360,
        notes: 'Upper body and core circuit.',
      },
      {
        userId: users[2]._id.toString(),
        type: 'Walk',
        durationMinutes: 25,
        caloriesBurned: 180,
        notes: 'Recovery walk after class.',
      },
      {
        userId: users[3]._id.toString(),
        type: 'Bike',
        durationMinutes: 40,
        caloriesBurned: 500,
        notes: 'Tempo training outside on the track loop.',
      },
    ]);

    const leaderboardEntries = await LeaderboardEntry.insertMany([
      { userId: users[0]._id.toString(), name: users[0].name, score: 940, rank: 1 },
      { userId: users[1]._id.toString(), name: users[1].name, score: 910, rank: 2 },
      { userId: users[2]._id.toString(), name: users[2].name, score: 880, rank: 3 },
      { userId: users[3]._id.toString(), name: users[3].name, score: 860, rank: 4 },
    ]);

    await Workout.insertMany([
      {
        title: 'Power Sprint Circuit',
        focus: 'Cardio',
        durationMinutes: 25,
        difficulty: 'intermediate',
        description: 'A high-energy circuit mixing sprint drills with recovery jogging.',
      },
      {
        title: 'Core Stability Session',
        focus: 'Core',
        durationMinutes: 20,
        difficulty: 'beginner',
        description: 'Build posture and trunk control through controlled repeats.',
      },
      {
        title: 'Strength Builder',
        focus: 'Muscle',
        durationMinutes: 35,
        difficulty: 'advanced',
        description: 'Compound movement focus for legs, rows, and presses.',
      },
    ]);

    console.log('Seeded users:', users.length);
    console.log('Seeded teams:', teams.length);
    console.log('Seeded activities:', activities.length);
    console.log('Seeded leaderboard entries:', leaderboardEntries.length);
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
