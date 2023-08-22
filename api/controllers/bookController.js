import db from "../models/index.js";
import { createError } from "../utils/creatError.js";
const Book = db.books;

export const getBooks = async (req, res, next) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    next(error);
  }
};

export const getBook = async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return next(createError(404, "Book not found"));
    }
    res.json(book);
  } catch (error) {
    next(error);
  }
};

export const createBook = async (req, res, next) => {
  const { title, desc, cover,price } = req.body;
  if (!title || !desc || !cover || !price) {
    return next(createError(400, "Title ,desc ,price and cover are required"));
  }

  try {
    const book = await Book.create({ title, desc, cover,price });
    res.json({ message: "Book created successfully", book });
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return next(createError(400, "Book not found"));
    }
    await book.destroy();
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req, res, next) => {
  const { id } = req.params;
  const { title, desc, cover,price } = req.body;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return next(createError(400, "Book not found"));
    }

    if (title) book.title = title;
    if (desc) book.desc = desc;
    if (cover) book.cover = cover;
    if (price) book.price = price;

    await book.save();
    res.json({ message: "Book updated successfully", book });
  } catch (error) {
    next(error);
  }
};
