import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    id: mongoose.Types.ObjectId,
    userId: {
      type: String,
      required: true,
    },
    creatorUsername: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      max: 500,
      validate: {
        validator: function (v: string) {
          return /\S/.test(v);
        },
        message:
          "Selected content is not valid! The content of a comment must not be an empty string!",
      },
    },
  },
  { timestamps: true, strict: true }
);

const Comment = mongoose.model("Comment", commentSchema, "Comments");

export default Comment;
