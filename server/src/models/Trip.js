import mongoose from 'mongoose';
import { TRAVEL_STYLES, pointSchema } from './_shared.js';

const { Schema } = mongoose;

const schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: String,
    destination: {
      name: String,
      country: String,
      location: pointSchema,
    },
    // Layover mode: the exact window Jackson is in the country.
    layover: {
      arrivalAt: Date,
      departureAt: Date,
      immigrationBufferMin: Number,
      returnBufferMin: Number,
    },
    style: { type: String, enum: TRAVEL_STYLES },
    interests: [String],
    filters: Schema.Types.Mixed,
    savedPlaces: [{ type: Schema.Types.ObjectId, ref: 'Place' }],
    status: { type: String, enum: ['draft', 'planned', 'active', 'done'], default: 'draft' },
  },
  { timestamps: true },
);

export default mongoose.model('Trip', schema);
