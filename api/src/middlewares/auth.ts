// imports
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

// fetch private key from env file
const PRIVATE_KEY = process.env.PRIVATE_KEY ?? "";

interface JWTPayload {
  id: string;
  username: string;
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  let token = req.cookies["jwt_token"];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  let decoded = jwt.verify(token, PRIVATE_KEY) as JWTPayload;

  if (req.body.userId && req.body.userId !== decoded.id) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export const isPasswordCorrect = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    typeof req.body.password !== "string" ||
    req.body.password.trim().length < 8
  ) {
    res.status(400).json({
      message: "Password must be at least 8 characters without spaces",
    });
    return;
  } else {
    next();
  }
};
