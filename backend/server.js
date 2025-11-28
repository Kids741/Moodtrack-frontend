import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import moodRoutes from "./routes/moodRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import chatbotRoutes from "./routes/chatbot.js";
import journalRoutes from "./routes/journalRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

// Only load .env in development
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();

// === MongoDB Connection ===
const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/moodtrack';
  
  if (!uri || uri === 'mongodb://127.0.0.1:27017/moodtrack') {
    console.error(" MONGODB_URI is not set in environment variables!");
    if (process.env.NODE_ENV === 'production') {
      console.error("Cannot start in production without MongoDB URI");
      process.exit(1);
    }
  }
  
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Give up initial connection after 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(" MongoDB connection failed:", error.message);
    console.error("URI being used:", uri.replace(/:[^:@]+@/, ':****@')); // Hide password
    // Exit if running in production and DB is required
    if (process.env.NODE_ENV === 'production') process.exit(1);
  }
};

connectDB();

// === Middleware ===
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    
    // Allow localhost
    if (allowedOrigins.includes(origin)) return callback(null, true);
    
    // Allow all Vercel deployments
    if (origin.includes('vercel.app')) return callback(null, true);
    
    // Reject others
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// === Routes ===
app.use("/api/moods", moodRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatbotRoutes);
app.use("/api/journal", journalRoutes);
app.use("/api/contact", contactRoutes);

// === Root Endpoint ===
app.get("/", (req, res) => {
  res.send(" MoodTrack API is running...");
});

// === Server Start ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌍 Server running on port ${PORT}`));
