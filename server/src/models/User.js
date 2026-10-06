import mongoose from 'mongoose';
import { TRAVEL_STYLES } from './_shared.js';

const { Schema } = mongoose;

const schema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    name: { type: String, required: true, trim: true },
    age: Number,
    location: String,
    about: String,
    hobbies: [String],
    interests: [String],
    countriesVisited: [String],
    placesVisited: [{ type: Schema.Types.ObjectId, ref: 'Place' }],
    travelStyle: { type: String, enum: TRAVEL_STYLES },
    isVerified: { type: Boolean, default: false },
    avatar: {
      model: String, // low-poly avatar preset
      colors: Schema.Types.Mixed,
    },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
  },
  { timestamps: true },
);

export default mongoose.model('User', schema);
