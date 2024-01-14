import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required!"],
      min: 2,
      max: 50,
      unique: true,
      validate: {
        validator: function (v: string) {
          return /^\S+$/.test(v);
        },
        message:
          "Selected username is not valid! Username must be a one-word of min. 2 characters!",
      },
    },
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    age: {
      type: Number,
      min: 0,
      max: 120,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
      validate: {
        validator: function (v: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message:
          "Selected email is not valid! Email must be in format 'example@domain.com'",
      },
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    location: String,
    occupation: String,
  },
  { timestamps: true, strict: true }
);

const User = mongoose.model("User", UserSchema, "Users");
export default User;
