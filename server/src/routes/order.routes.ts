import { Router } from "express";

import {
  create,
  getOpen,
  addItem,
} from "../controllers/order.controller";

import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/",
  authenticateToken,
  create
);
router.post(
  "/:id/items",
  authenticateToken,
  addItem
);

router.get(
  "/open",
  authenticateToken,
  getOpen
);

export default router;