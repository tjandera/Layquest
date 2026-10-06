import mongoose from 'mongoose';
import { pointSchema } from './_shared.js';

const { Schema } = mongoose;

const schema = new Schema(
  {
    host: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: String,
    place: { type: Schema.Types.ObjectId, ref: 'Place' },
    location: pointSchema,
    startsAt: Date,
    capacity: Number,
    tags: [String],
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);
schema.index({ location: '2dsphere' });

export default mongoose.model('SideQuest', schema);
