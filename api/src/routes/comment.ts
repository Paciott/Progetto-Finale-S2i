import express from "express";
import {
  deleteComment,
  updateComment,
} from "../controllers/commentsController";

const router = express.Router();

router.delete("/:commentId", deleteComment);
router.put("/:commentId", updateComment);

// Export
export { router as commentsRouter };
