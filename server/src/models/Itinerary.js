import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema(
  {
    trip: { type: Schema.Types.ObjectId, ref: 'Trip', required: true, index: true },
    // 'gemini' or 'fallback': which planner produced the current version.
    source: { type: String, enum: ['gemini', 'fallback'], required: true },
    days: [
      {
        dayNumber: Number,
        stops: [
          {
            place: { type: Schema.Types.ObjectId, ref: 'Place' },
            startAt: Date, // computed by the server, never by the AI
            endAt: Date,
            travelMinutesFromPrev: Number,
            note: String, // short AI copy
          },
        ],
      },
    ],
    version: { type: Number, default: 1 },
    revisions: [{ instruction: String, at: { type: Date, default: Date.now } }],
  },
  { timestamps: true },
);

export default mongoose.model('Itinerary', schema);
