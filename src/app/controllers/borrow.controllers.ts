import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";

export const borrowRoute = express.Router();

borrowRoute.post("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const { bookId, quantity, dueDate } = req.body;
    if (!bookId || !quantity || !dueDate) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        error: "book, quantity and dueDate required",
      });
    }

    const update = {
      $inc: { copies: -quantity },
    };

    const query = {
      _id: bookId,
      copies: { $gte: quantity },
    };

    const options = { new: true };
    const updatedBook = await Book.findOneAndUpdate(query, update, options);

    if (!updatedBook) {
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({
          success: false,
          message: "Book not found",
          error: "Book may not exists or Invalid book id",
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Not enough copies available",
          error: `Only ${book.copies} are left`,
        });
      }
    }

    if (updatedBook.copies === 0){
      updatedBook.available = false
      await updatedBook.save()
    }

    const borrow = await Borrow.create({
      book: updatedBook._id,
      quantity,
      dueDate,
    });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Borrow this book",
    });
  }
});

// Borrowed books summary

borrowRoute.get("/", async (req: Request, res: Response): Promise<any> => {
  const summary = await Borrow.aggregate([
    {
      $group: {
        _id: "$book",
        totalQuantity: { $sum: "$quantity" },
      },
    },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "bookInfo",
      },
    },
    {
      $unwind: "$bookInfo",
    },
    {
      $project: {
        _id: 0,
        totalQuantity: 1,
        book: {
          title: "$bookInfo.title",
          isbn: "$bookInfo.isbn",
        },
      },
    },
  ]);

  return res.status(200).json({
    success: true,
    message: "Borrowed books summary retrieved successfully",
  });
});
