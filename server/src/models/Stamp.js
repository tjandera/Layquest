import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    countryCode: { type: String, required: true }, // ISO 3166-1 alpha-2
    place: { type: Schema.Types.ObjectId, ref: 'Place' },
    quest: { type: Schema.Types.ObjectId, ref: 'Quest' },
    stampedAt: { type: Date, default: Date.now },
    animation: String, // which "chop" animation to play
  },
  { timestamps: true },
);

export default mongoose.model('Stamp', schema);
