import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      min: 2,
      max: 50,
      unique: false
    },
    location: String,
    title: {
      type: String,
      validate: {
        validator: function(v: string) {
          return /\S/.test(v)
        },
        message: "Selected title is not valid! The title must not be an empty string!"
      }
    },
    content: {
      type: String,
      validate: {
        validator: function(v: string) {
          return /\S/.test(v)
        },
        message: "Selected content is not valid! The content of a post must not be an empty string!"
      }
    },
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema, "Posts");

export default Post;