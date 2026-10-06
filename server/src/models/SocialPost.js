import mongoose from 'mongoose';

const { Schema } = mongoose;

// Cache of oEmbed results for location pages.
const schema = new Schema(
  {
    place: { type: Schema.Types.ObjectId, ref: 'Place', required: true, index: true },
    platform: { type: String, enum: ['tiktok', 'lemon8', 'instagram'], required: true },
    url: { type: String, required: true },
    embedHtml: String,
    authorName: String,
    thumbnailUrl: String,
    fetchedAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 },
  },
  { timestamps: true },
);
schema.index({ place: 1, url: 1 }, { unique: true });

export default mongoose.model('SocialPost', schema);
