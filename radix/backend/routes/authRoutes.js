import express from "express";
import { register, login, verifyToken, checkPostPermission, resendVerificationCode } from "../controllers/authControllers.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/resend-verification", resendVerificationCode);

// Export middleware for use in other routes
export { verifyToken, checkPostPermission };

export default router;
