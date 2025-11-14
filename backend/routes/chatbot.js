import express from "express";
import OpenAI from "openai";
import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { checkRateLimit } from "../utils/rateLimiter.js";


dotenv.config();
const router = express.Router();


const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";
const MAX_HISTORY = Number(process.env.MAX_HISTORY_MESSAGES || 8);


// simple auth middleware (adapt to your existing middleware)
async function authMiddleware(req, res, next) {
const auth = req.headers.authorization;
if (!auth) return res.status(401).json({ error: "Missing auth" });
const token = auth.split(" ")[1];
try {
const payload = jwt.verify(token, process.env.JWT_SECRET);
req.user = payload; // { userId, email }
next();
} catch (err) {
return res.status(401).json({ error: "Invalid token" });
}
}


router.post("/", authMiddleware, async (req, res) => {
try {
const userId = req.user.userId;
if (checkRateLimit(userId)) return res.status(429).json({ error: "Rate limit" });


const { text, conversationId } = req.body;
if (!text) return res.status(400).json({ error: "text is required" });



// find or create conversation
let conversation = null;
if (conversationId) {
conversation = await Conversation.findById(conversationId);
}
if (!conversation) {
conversation = await Conversation.create({ user: userId });
}


// save user message
const userMessage = await Message.create({ conversation: conversation._id, role: "user", content: text });


// fetch last N messages to provide context
const recentMessages = await Message.find({ conversation: conversation._id })
  .sort({ createdAt: 1 })
  .limit(MAX_HISTORY)
  .lean();

// Build a simple assistant response (replace with real OpenAI call when ready)
const assistantContent = `Echo: ${text}`;
const assistantMessage = await Message.create({
conversation: conversation._id,
role: "assistant",
content: assistantContent,
});

// return the assistant message and conversation id
return res.json({ message: assistantMessage, conversationId: conversation._id });
} catch (err) {
console.error(err);
return res.status(500).json({ error: "Server error" });
}
});

export default router;