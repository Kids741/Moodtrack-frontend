import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import moodRoutes from "./routes/moodRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Only load .env in development
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();

// === MongoDB Connection ===
const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/moodtrack';
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
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

// === Root Endpoint ===
app.get("/", (req, res) => {
  res.send(" MoodTrack API is running...");
});

// === Server Start ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌍 Server running on port ${PORT}`));
