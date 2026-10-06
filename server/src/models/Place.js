import mongoose from 'mongoose';
import { pointSchema } from './_shared.js';

const { Schema } = mongoose;

const schema = new Schema(
  {
    stbId: { type: String, index: true, sparse: true },
    source: { type: String, enum: ['stb', 'user'], default: 'stb' },
    name: { type: String, required: true },
    description: String,
    category: String,
    tags: [String],
    address: String,
    imageUrl: String,
    location: { type: pointSchema, required: true },
    // Needed so itineraries respect real opening hours.
    openingHours: [{ day: Number, open: String, close: String }], // day 0-6, "HH:mm"
    avgVisitMinutes: { type: Number, default: 60 },
    costLevel: { type: Number, min: 0, max: 4 },
    aiSummary: { text: String, generatedAt: Date },
  },
  { timestamps: true },
);
schema.index({ location: '2dsphere' });

export default mongoose.model('Place', schema);
