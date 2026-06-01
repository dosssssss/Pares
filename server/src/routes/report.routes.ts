import { Router } from "express";

import {
  summary,
  orderHistory,
} from "../controllers/report.controller";

import {
  authenticateToken,
} from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/summary",
  authenticateToken,
  summary
);
router.get(
  "/orders",
  authenticateToken,
  orderHistory
);
export default router;