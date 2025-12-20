import { Router } from "express";
import * as borrowRecordController from "../controllers/borrowRecord.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { adminOnly } from "../middlewares/role.middleware";
const router = Router();
router.post("/", authenticate, borrowRecordController.createBorrow);
router.get("/me", authenticate, borrowRecordController.getMyBorrows);
router.get("/", authenticate, adminOnly, borrowRecordController.getAllBorrows);
router.get("/:id", authenticate, adminOnly, borrowRecordController.getBorrowById);
router.put("/:id/return", authenticate, borrowRecordController.returnBorrow);
router.delete("/:id", authenticate, adminOnly, borrowRecordController.deleteBorrow);
export default router;
//# sourceMappingURL=borrowRecord.routes.js.map