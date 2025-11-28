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
      trim: true,
      maxlength: 32,
    },
    note: {
      type: String,
      trim: true,
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
