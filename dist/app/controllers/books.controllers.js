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
exports.booksRoute = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.booksRoute = express_1.default.Router();
// create book
exports.booksRoute.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const book = yield book_model_1.Book.create(body);
    res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: book,
    });
}));
// get all book
exports.booksRoute.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sort, limit = 10 } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const books = yield book_model_1.Book.find(query)
            .sort({ title: sort === "asc" ? 1 : 1 })
            .limit(Number(limit));
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get books data",
        });
    }
}));
// get a book by id
exports.booksRoute.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seeking = req.params.bookId;
        const book = yield book_model_1.Book.findById(seeking);
        res.status(201).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "Failed to retrieved your required book",
            error,
        });
    }
}));
// update a book
exports.booksRoute.patch("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const targetBook = req.params.bookId;
        const updateBook = req.body;
        const book = yield book_model_1.Book.findByIdAndUpdate(targetBook, updateBook, {
            new: true,
        });
        res.status(201).json({
            success: true,
            message: "Book updated successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "Failed to retrieved your required book",
            error,
        });
    }
}));
// deleting a book
exports.booksRoute.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteBook = req.params.bookId;
        yield book_model_1.Book.findByIdAndDelete(deleteBook);
        res.status(201).json({
            success: true,
            message: "Book deleted successfully",
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to delete",
        });
    }
}));
