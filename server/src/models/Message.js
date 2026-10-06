import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema(
  {
    conversation: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true, index: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    body: { type: String, required: true, maxlength: 2000 },
  },
  { timestamps: true },
);

export default mongoose.model('Message', schema);
