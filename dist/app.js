"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controllers_1 = require("./app/controllers/books.controllers");
const borrow_controllers_1 = require("./app/controllers/borrow.controllers");
const app = (0, express_1.default)();
// middleware will added here
app.use(express_1.default.json());
app.use('/api/books', books_controllers_1.booksRoute);
app.use('/api/borrow', borrow_controllers_1.borrowRoute);
// primary route
app.get('/', (req, res) => {
    res.send('welcome to Library Management System 📚');
});
exports.default = app;
