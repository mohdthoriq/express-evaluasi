import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { adminOnly } from "../middlewares/role.middleware";
import { BorrowItemRepository } from "../repositories/borrowItem.repository";
import { BorrowItemService } from "../services/borrow_Item.service";
import { BorrowItemController } from "../controllers/borrow_Item.controller";
import { PrismaInstance } from "../database";
const router = Router();
const repo = new BorrowItemRepository(PrismaInstance);
const service = new BorrowItemService(repo);
const controller = new BorrowItemController(service);
router.get("/stats", authenticate, adminOnly, controller.getStats);
router.get("/", authenticate, adminOnly, controller.getAllItems);
router.get("/:id", authenticate, adminOnly, controller.getItemById);
export default router;
//# sourceMappingURL=borrowItem.routes.js.map