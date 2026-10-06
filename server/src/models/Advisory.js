import mongoose from 'mongoose';
import { pointSchema } from './_shared.js';

const { Schema } = mongoose;

const schema = new Schema(
  {
    source: { type: String, enum: ['open-meteo', 'gdacs'], required: true },
    externalId: String,
    regionName: String,
    location: { type: pointSchema, required: true },
    type: { type: String, enum: ['rain', 'storm', 'flood', 'earthquake', 'cyclone', 'other'] },
    severity: { type: String, enum: ['low', 'moderate', 'high', 'extreme'], required: true },
    summary: String,
    packingTips: [String],
    validFrom: Date,
    validTo: Date,
    // Acts as a cache: documents expire so we refetch.
    fetchedAt: { type: Date, default: Date.now, expires: 60 * 60 * 6 },
  },
  { timestamps: true },
);
schema.index({ location: '2dsphere' });

export default mongoose.model('Advisory', schema);
