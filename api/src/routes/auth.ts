import express from "express";
import { registerUser, login, logout } from "../controllers/authController";
import { isPasswordCorrect } from "../middlewares/auth";

const router = express.Router();

router.post("/register", isPasswordCorrect, registerUser);
router.post("/login", login);
router.post("/logout", logout);

// Export
export { router as authRouter };
