import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";

export const borrowRoute = express.Router();

borrowRoute.post("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const { book, quantity, dueDate } = req.body;
    if (!book || !quantity || !dueDate) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        error: "book, quantity and dueDate required",
      });
    }

    const isEnoughCopies = await Book.findOne({
      _id: book,
      copies: {$gte: Number(quantity)}
    })
    
    if(!isEnoughCopies){
      return res.status(200).json({
        success: false,
        message: "No more copy available"
      })
    }

    const newBorrow = new Borrow({
      book, quantity, dueDate
    })

    await newBorrow.save()

    if(isEnoughCopies && isEnoughCopies.copies - Number(quantity) === 0) {
      isEnoughCopies.availability(Number(quantity))
    }

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: newBorrow
    })

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
    date: summary

  });
});
