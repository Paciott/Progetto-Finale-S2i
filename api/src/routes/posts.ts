import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  deletePost,
  createPost,
  commentPost,
  getPostComments,
  updatePost,
} from "../controllers/postsController";
import { verifyToken } from "../middlewares/auth";

const router = express.Router();

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId", verifyToken, getUserPosts);
router.get("/comments/:postId", verifyToken, getPostComments);
router.post("/createPost", verifyToken, createPost);
router.put("/:postId", verifyToken, likePost);
router.put("/update/:postId", verifyToken, updatePost);
router.put("/comments/:postId/", verifyToken, commentPost);
router.delete("/:postId", verifyToken, deletePost);

// Export
export { router as postsRouter };
