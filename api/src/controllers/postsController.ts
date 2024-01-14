// imports
import Post from "../models/Post";
import User from "../models/User";
import Comment from "../models/Comment";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
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
export const getFeedPosts = async (req: Request, res: Response) => {
  try {
    // get posts from DB
    const posts = await Post.find().limit(20).sort({ createdAt: -1 });

    // if we have no posts, throw 404
    if (!posts) {
      res.status(404).json({ message: "No posts found" });
      return;
    }

    // throw 200
    res.status(200).json(posts);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    // get data from params
    const { userId } = req.params;

    // search for posts on DB
    const posts = await Post.find({ userId }).sort({ createdAt: -1 });

    // if there are no posts, throw a 404
    if (posts.length === 0) {
      res.status(404).json({ message: "No posts found" });
      return;
    }

    // throw 200
    res.status(200).json(posts);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const getPostComments = async (req: Request, res: Response) => {
  try {
    // get data from params
    const { postId } = req.params;
    // search for comments on DB
    const comments = await Comment.find({ postId: postId }).sort({
      createdAt: -1,
    });
    // if there are no posts, throw a 404
    if (comments.length === 0) {
      res.status(404).json({ message: "No comments found" });
      return;
    }
    // throw 200
    res.status(200).json(comments);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

// CREATE
export const createPost = async (req: Request, res: Response) => {
  try {
    // get data from body request
    const { userId, title, content } = req.body;

    // check if data are correct
    if (
      typeof userId !== "string" ||
      typeof title !== "string" ||
      typeof content !== "string"
    ) {
      res.status(400).json({ message: "Incorrect data" });
      return;
    }

    // find user by id
    const user = await User.findById(userId);

    // create new post
    const newPost = new Post({
      userId,
      username: user?.username,
      location: user?.location,
      title,
      content,
      likes: {},
      comments: [],
    });
    const post = await newPost.save();

    // throw 201
    res.status(201).json(post);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

// UPDATE

export const likePost = async (req: Request, res: Response) => {
  try {
    // fetch data from request params and body
    const { postId } = req.params;
    const { userId } = req.body;

    // fiind post by id
    const post = await Post.findById(postId);

    // if there is no post, throw 404
    if (!post) {
      res.status(404).json({ message: "post not found" });
      return;
    }

    const isLiked = post.likes!.get(userId);

    // toggle like based on like status on DB
    if (isLiked) {
      post.likes!.delete(userId);
    } else {
      post.likes!.set(userId, true);
    }

    // update post
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { likes: post.likes },
      { new: true }
    );

    // throw 200
    res.status(200).json({ updatedPost });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const commentPost = async (req: Request, res: Response) => {
  try {
    // get data from request params and body
    const { postId } = req.params;
    const { userId, content } = req.body;

    // check if data are correct
    if (
      typeof userId !== "string" ||
      typeof content !== "string" ||
      content.trim().length === 0
    ) {
      res.status(400).json({ message: "Incorrect data" });
      return;
    }

    // fetch token from cookies
    let token = req.cookies["jwt_token"];
    let decoded = jwt.verify(token, PRIVATE_KEY) as JWTPayload;

    // create new comment
    const newComment = await new Comment({
      creatorUsername: decoded.username,
      userId,
      postId: postId,
      content,
    }).save();

    // update post for insert the comment
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: newComment } },
      { new: true }
    );

    // if post is not found, throw 404
    if (!updatedPost) {
      res.status(404).json({ message: "post not found" });
      return;
    }

    // throw 200
    res.status(200).json({ updatedPost });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    // get data from request params and body
    const { postId } = req.params;
    const { userId, title, content } = req.body;

    // check if data are correct
    if (
      typeof postId !== "string" ||
      typeof userId !== "string" ||
      typeof title !== "string" ||
      typeof content !== "string" ||
      title.trim().length === 0 ||
      content.trim().length === 0
    ) {
      res.status(400).json({ message: "Incorrect data" });
      return;
    }

    // update post for insert the new values
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title: title, content: content },
      { new: true }
    );

    // if post is not found, throw 404
    if (!updatedPost) {
      res.status(404).json({ message: "post not found" });
      return;
    }

    // throw 200
    res.status(200).json({ updatedPost });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

// DELETE

export const deletePost = async (req: Request, res: Response) => {
  try {
    // get data from request params and body
    const { postId } = req.params;
    const { userId } = req.body;

    // get post from DB
    const post = await Post.findById(postId);

    // if post doesn't exist, throw 404
    if (!post) {
      res.status(404).json({ message: "post not found" });
      return;
    }

    // if the user deleting isn't the user related to token, throw 400
    if (userId !== post.userId) {
      res.status(400).json({ message: "Unauthorized" });
      return;
    }

    // proceed to delete post and all related comments
    await Post.deleteOne({ _id: postId });
    await Comment.deleteMany({ postId: postId });
    //throw 200
    res.status(200).json({ message: "Post deleted" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};
