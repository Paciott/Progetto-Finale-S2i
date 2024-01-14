// imports
import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import "dotenv/config";

// get private key from env file
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// REGISTER
export const registerUser = async (req: Request, res: Response) => {
  try {
    // get data from request body
    const {
      username,
      firstName,
      lastName,
      age,
      email,
      password,
      location,
      occupation,
    } = req.body;

    if (firstName.trim().length === 0 || lastName.trim().length === 0) {
      res.status(400).json({ error: "invalid name" });
      return;
    }

    // hash and salt the password with bcrypt
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // create a new user
    const newUser = new User({
      username,
      firstName,
      lastName,
      age,
      email,
      password: passwordHash,
      location,
      occupation,
    });

    const savedUser = await newUser.save();

    // send a 201
    res.status(201).json(savedUser);
  } catch (error: unknown) {
    if (error instanceof Error) {
      // cover error of duplicate username
      if (
        error.message.includes(
          "E11000 duplicate key error collection: Progetto_finale.Users index: username_1 dup key"
        )
      ) {
        res.status(406).json({ error: error.message });
        return;
      }

      if (
        error.message.includes(
          "E11000 duplicate key error collection: Progetto_finale.Users index: email_1 dup key"
        )
      ) {
        res.status(409).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message });
    }
  }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // check for correct data
    if (
      !email ||
      !password ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      res.status(400).json({ message: "Incorrect data sent" });
      return;
    }

    // look for existing user in db
    const user = await User.findOne({ email: email });

    // if user doesn't exist or password doesn't match, throw bad request
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch || !user)
      return res.status(400).json({ message: "Invalid credentials" });

    // if login succeeded, create a token, set a cookie and throw a 200
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        email: user.email,
        location: user.location,
        occupation: user.occupation,
      },
      PRIVATE_KEY as string
    );
    res.cookie("jwt_token", token, { httpOnly: true });
    res.status(200).json({
      message: "Login successfull!",
      user: {
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        email: user.email,
        location: user.location,
        occupation: user.occupation,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

// LOGOUT
export const logout = async (req: Request, res: Response) => {
  try {
    // remove the cookie from browser and throw 200
    res
      .clearCookie("jwt_token")
      .status(200)
      .json({ message: "Logout succesfull!" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};
