import mongoose from 'mongoose';

async function connectDB() {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/moodtrack';
  try {
    await mongoose.connect(uri, {
      // useNewUrlParser and useUnifiedTopology are default in Mongoose 6+
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    // Exit process if DB connection fails in production
    if (process.env.NODE_ENV === 'production') process.exit(1);
  }
}

export default connectDB;
