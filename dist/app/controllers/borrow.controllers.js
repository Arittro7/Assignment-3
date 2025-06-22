"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoute = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
const borrow_model_1 = require("../models/borrow.model");
exports.borrowRoute = express_1.default.Router();
exports.borrowRoute.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = req.body;
        if (!book || !quantity || !dueDate) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
                error: "book, quantity and dueDate required",
            });
        }
        const isEnoughCopies = yield book_model_1.Book.findOne({
            _id: book,
            copies: { $gte: Number(quantity) }
        });
        if (!isEnoughCopies) {
            return res.status(200).json({
                success: false,
                message: "No more copy available"
            });
        }
        const newBorrow = new borrow_model_1.Borrow({
            book, quantity, dueDate
        });
        yield newBorrow.save();
        if (isEnoughCopies && isEnoughCopies.copies - Number(quantity) === 0) {
            isEnoughCopies.availability(Number(quantity));
        }
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: newBorrow
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to Borrow this book",
        });
    }
}));
// Borrowed books summary
exports.borrowRoute.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const summary = yield borrow_model_1.Borrow.aggregate([
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
}));
