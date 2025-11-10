import mongoose from "mongoose";

const moodSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    mood: {
      type: String,
      required: true,
      enum: ["happy", "sad", "angry", "calm", "anxious", "neutral"],
    },
    note: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Mood = mongoose.model("Mood", moodSchema);
export default Mood;
