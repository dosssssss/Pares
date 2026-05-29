import { Router } from "express";

import { login } from "../controllers/auth.controller";
import {
  authenticateToken,
  AuthRequest,
} from "../middleware/auth.middleware";

const router = Router();

router.post("/login", login);

router.get(
  "/me",
  authenticateToken,
  (req: AuthRequest, res) => {
    res.json({
      success: true,
      user: req.user,
    });
  }
);

export default router;