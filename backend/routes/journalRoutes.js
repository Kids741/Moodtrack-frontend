import express from "express";
import Journal from "../models/Journal.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Auth middleware
const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "Missing authorization" });
  
  const token = auth.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Get all journal entries for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const entries = await Journal.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new journal entry
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Content is required" });
    }

    const newEntry = await Journal.create({
      userId: req.user.id,
      content: content.trim(),
    });

    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a journal entry
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const entry = await Journal.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    await Journal.deleteOne({ _id: req.params.id });
    res.json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
