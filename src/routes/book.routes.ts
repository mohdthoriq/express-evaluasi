import { Router } from "express";
import * as book from "../controllers/book.controller";
import { validate } from "../middlewares/product.validation";
import { createBookValidation, getBookByIdValidation, searchBookValidation, updateBookValidation } from "../validations/book.validation";


const router = Router()

router.get('/', book.getAll)

router.get('/:id', validate(getBookByIdValidation), book.getById)

router.get('/search', validate(searchBookValidation), book.search)

router.post('/', validate(createBookValidation), book.create)

router.put('/:id', validate(updateBookValidation), book.update)

router.delete('/:id', book.remove)

export default router;