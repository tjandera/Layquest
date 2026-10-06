import mongoose from 'mongoose';

export const TRAVEL_STYLES = ['budget', 'adventurous', 'party', 'conservative'];

/** GeoJSON Point. coordinates are [longitude, latitude]. */
export const pointSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true },
  },
  { _id: false },
);
