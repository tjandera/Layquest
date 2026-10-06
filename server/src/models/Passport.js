import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    cover: {
      type: { type: String, enum: ['preset', 'upload', 'drawing'], default: 'preset' },
      presetId: String,
      imageUrl: String,
      drawingData: String, // serialised drawing (e.g. SVG path data or data URL)
    },
    achievements: [
      {
        achievement: { type: Schema.Types.ObjectId, ref: 'Achievement' },
        earnedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model('Passport', schema);
