import { Router } from "express";

import {
  create,
  getAll,
} from "../controllers/category.controller";

import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/",
  authenticateToken,
  create
);

router.get(
  "/",
  authenticateToken,
  getAll
);

export default router;