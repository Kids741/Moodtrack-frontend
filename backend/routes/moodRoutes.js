import express from "express";
import Mood from "../models/Mood.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc  Get moods for authenticated user
router.get("/", protect, async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(moods);
  } catch (error) {
    console.error("Failed to fetch moods", error);
    res.status(500).json({ message: "Unable to fetch moods" });
  }
});

// @desc  Add new mood for authenticated user
router.post("/", protect, async (req, res) => {
  const { mood, note } = req.body;

  if (!mood) {
    return res.status(400).json({ message: "Mood is required" });
  }

  try {
    const newMood = await Mood.create({
      userId: req.user.id,
      mood,
      note,
    });

    res.status(201).json(newMood);
  } catch (error) {
    console.error("Failed to save mood", error);
    res.status(400).json({ message: error.message || "Unable to save mood" });
  }
});

export default router;
