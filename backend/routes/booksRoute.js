import express from 'express';
import { Book } from '../models/bookModels.js';


const router = express.Router();

 
// CREATE BOOK
router.post("/", async (req, res) => {
  try {
    const { title, author, publishedYear } = req.body;

    if (!title || !author || !publishedYear) {
      return res.status(400).json({
        message: "Send all required fields!",
      });
    }

    const book = await Book.create({
      title,
      author,
      publishedYear,
    });

    return res.status(201).json(book);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
});

// GET ALL BOOKS
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
});

// 1. SEARCH BY TITLE (Using Query)
// This matches: /books/testing/Gundam Z
router.get("/testing/:title", async (req, res) => { 
  try {
    const { title } = req.params; // Extracts "Gundam Z" from the URL
    
    // Using RegExp to handle spaces and case sensitivity
    const book = await Book.findOne({ 
      title: new RegExp(title, "i") 
    });

    if (!book) {
      return res.status(404).json({ 
        message: `No book found with title: ${title}` 
      });
    }

    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// 2. SEARCH BY ID (Put this SECOND)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // PROTECTION: If the ID isn't 24 characters, don't even try to search
    if (id.length !== 24) {
      return res
        .status(400)
        .json({ message: "That is not a valid MongoDB ID" });
    }

    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: "ID not found" });

    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Update books by ID
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishedYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishedYear",
      });
    }

    const { id } = req.params; // This now correctly grabs the ID from the URL
    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book updated successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
//Deleting a book

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
