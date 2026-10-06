import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema(
  {
    kind: { type: String, enum: ['quest', 'sidequest'], required: true },
    refId: { type: Schema.Types.ObjectId, required: true }, // the quest or side-quest id
    participants: [{ type: Schema.Types.ObjectId, ref: 'User', index: true }],
    lastMessageAt: Date,
  },
  { timestamps: true },
);

export default mongoose.model('Conversation', schema);
