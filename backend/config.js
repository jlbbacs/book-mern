import dotenv from 'dotenv';
dotenv.config();

// Vercel provides a PORT automatically, but we use 5000 for local dev
export const PORT = process.env.PORT || 5000;

// This will look for a variable named MONGO_URI in your environment settings
export const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://josephlesterbacs_db_user:Ii4ko5mTun3pGjDt@cluster0.priiofy.mongodb.net/books-collection?retryWrites=true&w=majority";