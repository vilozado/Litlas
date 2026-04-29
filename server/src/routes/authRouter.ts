import { Router } from "express";
import { signUp, login, logout } from "../controllers/authController";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

const router = Router();

router.post("/signup", limiter, signUp);
router.post("/login", limiter, login);
router.post("/logout", logout);
export default router;
