// imports
import type { Request, Response } from "express";
import "dotenv/config";
import Post from "../models/Post";
import Comment from "../models/Comment";
import { ObjectId } from "mongodb";

// PUT

export const updateComment = async (req: Request, res: Response) => {
  try {
    // get data from request params and body
    const { commentId } = req.params;
    const { userId } = req.body;
    const { postId } = req.body;
    const { comment_content } = req.body;

    // get post from DB
    const comment = await Comment.findById(commentId);

    // if post doesn't exist, throw 404
    if (!comment) {
      res.status(404).json({ message: "post not found" });
      return;
    }

    // if the user deleting isn't the user related to token, throw 400
    if (userId !== comment.userId) {
      res.status(400).json({ message: "Unauthorized" });
      return;
    }

    if (comment_content.trim().length === 0) {
      res.status(400).json({ message: "Bad data provided" });
      return;
    }

    //proceed to delete comment
    //update post for delete the comment from the array
    // Aggiorna il contenuto del commento nel documento Post
    await Post.updateOne(
      {
        _id: postId,
        comments: { $elemMatch: { _id: new ObjectId(commentId) } },
      },
      { $set: { "comments.$.content": comment_content } }
    );
    await Comment.updateOne(
      { _id: commentId },
      { $set: { content: comment_content } },
      { safe: true }
    );
    //throw 200
    res.status(200).json({ message: "Comment deleted" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
      console.log(error.message);
    }
  }
};

// DELETE

export const deleteComment = async (req: Request, res: Response) => {
  try {
    // get data from request params and body
    const { commentId } = req.params;
    const { userId } = req.body;
    const { postId } = req.body;

    // get comment from DB
    const comment = await Comment.findById(commentId);

    // if comment doesn't exist, throw 404
    if (!comment) {
      res.status(404).json({ message: "post not found" });
      return;
    }

    // if the user deleting isn't the user related to token, throw 400
    if (userId !== comment.userId) {
      res.status(400).json({ message: "Unauthorized" });
      return;
    }

    //proceed to delete comment
    //update post for delete the comment from the array
    await Post.findByIdAndUpdate(
      postId,
      { $pull: { comments: { _id: new ObjectId(commentId) } } },
      { safe: true, multi: true }
    );
    // delete comment from 'Comments' collection
    await Comment.deleteOne({ _id: commentId });
    //throw 200
    res.status(200).json({ message: "Comment deleted" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};
