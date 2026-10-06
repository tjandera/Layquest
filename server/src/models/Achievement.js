import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: String,
    icon: String,
    xpReward: { type: Number, default: 0 },
    criteria: Schema.Types.Mixed,
  },
  { timestamps: true },
);

export default mongoose.model('Achievement', schema);
