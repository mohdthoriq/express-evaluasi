import { Router } from "express";
import * as category from "../controllers/category.controller";
import { validate } from "../middlewares/product.validation";
import { createCategoryValidation, getCategoryByIdValidation, searchCategoryValidation, updateCategoryValidation } from "../validations/category.validation";

const router = Router()

router.get('/', category.getAll)
router.get('/:id', validate(getCategoryByIdValidation), category.getById)
router.get('/search', validate(searchCategoryValidation), category.search)
router.post('/', validate(createCategoryValidation), category.create)
router.put('/:id', validate(updateCategoryValidation), category.update)
router.delete('/:id', category.remove)

export default router;