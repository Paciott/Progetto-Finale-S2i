import express  from "express";
import { viewProfile, updateUser, deleteUser, updateUserPassword } from "../controllers/usersController";
import { verifyToken, isPasswordCorrect } from "../middlewares/auth";

const router = express.Router();

router.get("/profile", verifyToken, viewProfile);
router.put("/profile", verifyToken, updateUser);
router.put("/profile/psw", verifyToken, isPasswordCorrect, updateUserPassword);
router.delete("/profile", verifyToken, deleteUser);

// Export
export {router as usersRouter};