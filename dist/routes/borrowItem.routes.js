import { Router } from "express";
import * as borrowItemController from "../controllers/borrow_Item.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { adminOnly } from "../middlewares/role.middleware";
const router = Router();
// ADMIN ONLY
router.get("/", authenticate, adminOnly, borrowItemController.getAllItems);
router.get("/:id", authenticate, adminOnly, borrowItemController.getItemById);
export default router;
//# sourceMappingURL=borrowItem.routes.js.map