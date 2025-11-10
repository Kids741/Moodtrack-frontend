import express from "express";
import Mood from "../models/Mood.js";

const router = express.Router();

// @desc  Get all moods
router.get("/", async (req, res) => {
  const moods = await Mood.find();
  res.json(moods);
});

// @desc  Add new mood
router.post("/", async (req, res) => {
  const { userId, mood, note } = req.body;
  try {
    const newMood = await Mood.create({ userId, mood, note });
    res.status(201).json(newMood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
