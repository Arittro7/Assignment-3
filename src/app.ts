import express, { Application, Request, Response } from "express";
import { booksRoute } from "./app/controllers/books.controllers";
import { borrowRoute } from "./app/controllers/borrow.controllers";
import cors from "cors";

const app: Application = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://library-management-system-khaki-eight.vercel.app",
    ],
    credentials: true,
  })
);

// middleware will added here
app.use(express.json());

app.use("/api/books", booksRoute);
app.use("/api/borrow", borrowRoute);

// primary route
app.get("/", (req: Request, res: Response) => {
  res.send("welcome to Library Management System 📚");
});

export default app;
