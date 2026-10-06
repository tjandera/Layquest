import mongoose from 'mongoose';
import { pointSchema } from './_shared.js';

const { Schema } = mongoose;

const schema = new Schema(
  {
    destinationName: { type: String, required: true },
    location: { type: pointSchema, required: true },
    plannedDate: Date,
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    status: { type: String, enum: ['active', 'cancelled'], default: 'active' },
    cancelledReason: String,
    cancelledAt: Date,
  },
  { timestamps: true },
);
schema.index({ location: '2dsphere' });

export default mongoose.model('Clan', schema);
