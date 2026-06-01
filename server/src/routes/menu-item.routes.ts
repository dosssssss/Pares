import { Router } from "express";

import {
  create,
  getAll,
  getByCategory,
  update,
  remove,
  toggleAvailability,
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
router.put(
  "/:id",
  authenticateToken,
  update
);

router.delete(
  "/:id",
  authenticateToken,
  remove
);
export default router;

router.patch(
  "/:id/toggle",
  authenticateToken,
  toggleAvailability
);