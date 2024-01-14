// imports
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authRouter } from "./routes/auth";
import { postsRouter } from "./routes/posts";
import { usersRouter } from "./routes/users";
import { commentsRouter } from "./routes/comment";

// variables
const PORT = process.env.PORT ?? 3000;
const DB_URL = process.env.MONGODB_CONNECTION_STRING;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

// express configuration
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: `http://localhost:${CORS_ORIGIN}`,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// mongodb connection
mongoose
  .connect(DB_URL as string)
  .then((result) =>
    app.listen(PORT, () => console.log(`App launched on port ${PORT} 🚀`))
  )
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello there! App is working corretly 🤖" });
});

// REST routes initialization for CRUD operations
app.use("/auth", authRouter);
app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/comments", commentsRouter);

// fallback for non existing routes
app.use((req, res) => {
  res.status(404).json({ message: "Sorry, this page doesn't exist 👻" });
});
