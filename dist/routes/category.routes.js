import { Router } from "express";
import { validate } from "../middlewares/product.validation";
import { createCategoryValidation, getCategoryByIdValidation, updateCategoryValidation } from "../validations/category.validation";
import { CategoryRepository } from "../repositories/category.repository";
import { CategoryService } from "../services/category.service";
import { CategoryController } from "../controllers/category.controller";
import { PrismaInstance } from "../database";
const router = Router();
const repo = new CategoryRepository(PrismaInstance);
const service = new CategoryService(repo);
const controller = new CategoryController(service);
router.get('/', controller.getAll);
router.get('/:id', validate(getCategoryByIdValidation), controller.getById);
router.get('/stats', controller.getStats);
router.post('/', validate(createCategoryValidation), controller.create);
router.put('/:id', validate(updateCategoryValidation), controller.update);
router.delete('/:id', controller.remove);
export default router;
//# sourceMappingURL=category.routes.js.map