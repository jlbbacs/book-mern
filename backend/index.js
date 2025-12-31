import express from "express";
import mongoose from "mongoose";
import { PORT, MONGO_URI } from "./config.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express(); // Define app first

app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5000', 'https://book-mern-stack.vercel.app'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// 1. DATABASE CONNECTION FUNCTION
// This ensures the connection is ready before handling requests
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
};

// 2. MIDDLEWARE TO ENSURE DB IS CONNECTED
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.get("/", (req, res) => {
  res.send("Hello Jesus! The backend is working.");
});

app.use("/books", booksRoute);

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 App is running on port: ${PORT}`);
  });
}

export default app;