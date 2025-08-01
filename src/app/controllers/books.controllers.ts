import express, { NextFunction, Request, Response } from "express";
import { Book } from "../models/book.model";

export const booksRoute = express.Router();

// create book
booksRoute.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const book = await Book.create(body);
      res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }
);

// get all book
booksRoute.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { filter, sort, limit = 10 } = req.query;

    const query: any = {};
    if (filter) {
      query.genre = filter;
    }

    const books = await Book.find(query)
      .sort({ title: sort === "asc" ? 1 : 1 })
      .limit(Number(limit));
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    next(error)
  }
});

// get a book by id
booksRoute.get("/:bookId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const seeking = req.params.bookId;
    const book = await Book.findById(seeking);
    res.status(201).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    next(error)
  }
});

// update a book
booksRoute.patch("/:bookId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const targetBook = req.params.bookId;
    const updateBook = req.body;
    const book = await Book.findByIdAndUpdate(targetBook, updateBook, {
      new: true,
    });
    res.status(201).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    
    next(error)
  }
});

// deleting a book
booksRoute.delete("/:bookId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleteBook = req.params.bookId;
    await Book.findByIdAndDelete(deleteBook);

    res.status(201).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    
    next(error)
  }
});
