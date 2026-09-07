import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, min: 1 },
    role: { type: String, default: 'student' },
    fitnessScore: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    captain: { type: String, required: true },
    members: [{ type: String }],
    color: { type: String, default: '#4f46e5' },
  },
  { timestamps: true },
);

const activitySchema = new Schema(
  {
    userId: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, default: 0 },
    notes: { type: String, default: '' },
  },
  { timestamps: true },
);

const leaderboardEntrySchema = new Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    score: { type: Number, required: true, default: 0 },
    rank: { type: Number, default: 1 },
  },
  { timestamps: true },
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    focus: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    description: { type: String, default: '' },
  },
  { timestamps: true },
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export const LeaderboardEntry =
  mongoose.models.LeaderboardEntry || mongoose.model('LeaderboardEntry', leaderboardEntrySchema);
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
