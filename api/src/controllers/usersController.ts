import User from "../models/User";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Post from "../models/Post";

const PRIVATE_KEY = process.env.PRIVATE_KEY ?? "";

interface JWTPayload {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  location: string;
  occupation: string;
}

// READ
export const viewProfile = async (req: Request, res: Response) => {
  try {
    // fetch token from cookies
    let token = req.cookies["jwt_token"];
    let decoded = jwt.verify(token, PRIVATE_KEY) as JWTPayload;
    // throw 200
    res.status(200).json({
      username: decoded.username,
      firstName: decoded.firstName,
      lasName: decoded.lastName,
      age: decoded.age,
      email: decoded.email,
      location: decoded.location,
      occupation: decoded.occupation,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

// PUT
export const updateUser = async (req: Request, res: Response) => {
  try {
    // fetch token from cookies
    let token = req.cookies["jwt_token"];
    let decoded = jwt.verify(token, PRIVATE_KEY) as JWTPayload;
    let userId = decoded.id;

    // fetch data from request body
    const { username, firstName, lastName, age, email, location, occupation } =
      req.body;

    // control wich data we have and if is of correct type
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      (username &&
        (typeof username !== "string" || username.trim().length === 0)) ||
      (firstName &&
        (typeof firstName !== "string" || firstName.trim().length === 0)) ||
      (lastName &&
        (typeof lastName !== "string" || lastName.trim().length === 0)) ||
      (email && (!emailRegex.test(email) || email.trim().length === 0))
    ) {
      console.log(typeof firstName + " " + lastName);
      res.status(400).json({ message: "Bad request" });
      return;
    }

    // update user by query
    await User.findByIdAndUpdate(userId, {
      username,
      firstName,
      lastName,
      age,
      email,
      location,
      occupation,
    });

    // throw 200
    res.status(200).json({ message: "User updated" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (
        error.message.includes(
          "Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: test.Users index: username_1 dup key:"
        )
      ) {
        res.status(403).json({ error: error.message });
        return;
      }

      if (
        error.message.includes(
          "Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: test.Users index: email_1 dup key:"
        )
      ) {
        res.status(409).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message });
    }
  }
};

export const updateUserPassword = async (req: Request, res: Response) => {
  try {
    // fetch data from request body
    const { oldPassword, password } = req.body;

    // take token from cookies
    let token = req.cookies["jwt_token"];
    let decoded = jwt.verify(token, PRIVATE_KEY) as JWTPayload;
    let userId = decoded.id;

    // find user on DB matching user logged in
    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // check if old password is correct
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // if it is correct, update user's password
    if (isMatch) {
      const updatedUser = await User.findByIdAndUpdate(userId, {
        password: passwordHash,
      });
      res.status(200).json(updatedUser);
      return;
    }
    // else, throw 401
    res.status(401).json({ message: "Bad request" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    // fetch token from cookies
    let token = req.cookies["jwt_token"];
    let decoded = jwt.verify(token, PRIVATE_KEY) as JWTPayload;
    let userId = decoded.id;

    // delete user and correlated posts fro  DB
    await User.findOneAndDelete({ id: userId });
    await Post.deleteMany({ userId: userId });

    // throw 200
    res.status(200).json({ message: "User deleted" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};
