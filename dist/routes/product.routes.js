import { Router } from "express";
import { remove, getAll, getByCategoryId, search, create, update, getByCategory } from "../controllers/product.controller.js";
import { createBookValidation, getBooksByIdValidation, validate } from "../middlewares/product.validation.js";
const router = Router();
router.get("/", getAll);
router.get("/:category", getByCategory);
router.get("/:category/:id", validate(getBooksByIdValidation), getByCategoryId);
router.get("/search", search);
router.post("/", validate(createBookValidation), create);
router.put("/:id", update);
router.delete("/:id", remove);
export default router;
//# sourceMappingURL=product.routes.js.map
