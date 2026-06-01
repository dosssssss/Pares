import { Router } from "express";

import {
  create,
  getAll,
  remove,
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
router.delete(
  "/:id",
  authenticateToken,
  remove
);
export default router;