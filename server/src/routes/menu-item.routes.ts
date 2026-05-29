import { Router } from "express";

import {
  create,
  getAll,
  getByCategory,
} from "../controllers/menu-item.controller";

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

router.get(
  "/category/:categoryId",
  authenticateToken,
  getByCategory
);

export default router;