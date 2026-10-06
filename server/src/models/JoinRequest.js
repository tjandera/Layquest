import mongoose from 'mongoose';

const { Schema } = mongoose;

// Chat is only unlocked once a request is approved.
const schema = new Schema(
  {
    sideQuest: { type: Schema.Types.ObjectId, ref: 'SideQuest', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'approved', 'declined'], default: 'pending' },
    respondedAt: Date,
  },
  { timestamps: true },
);
schema.index({ sideQuest: 1, user: 1 }, { unique: true });

export default mongoose.model('JoinRequest', schema);
