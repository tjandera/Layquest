import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    itinerary: { type: Schema.Types.ObjectId, ref: 'Itinerary', required: true },
    title: String,
    status: { type: String, enum: ['planned', 'active', 'completed', 'abandoned'], default: 'planned' },
    checkpoints: [
      {
        place: { type: Schema.Types.ObjectId, ref: 'Place' },
        order: Number,
        xp: { type: Number, default: 50 },
        radiusMeters: { type: Number, default: 60 },
        arrivedAt: Date,
      },
    ],
    // "Wild encounters": spots outside the plan that surface mid-walk.
    encounters: [
      {
        place: { type: Schema.Types.ObjectId, ref: 'Place' },
        spawnedAt: Date,
        caughtAt: Date,
        xp: Number,
      },
    ],
    // Quest parties: strangers or friends doing the same quest.
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    xpEarned: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model('Quest', schema);
