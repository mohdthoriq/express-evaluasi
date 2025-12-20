import { Router } from "express";
import * as book from "../controllers/book.controller";
import { validate } from "../middlewares/product.validation";
import { createBookValidation, getBookByIdValidation, updateBookValidation } from "../validations/book.validation";
import { authenticate } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware";
import { adminOnly } from "../middlewares/role.middleware";


const router = Router()

router.get('/', book.getAll)

router.get('/:id', validate(getBookByIdValidation), book.getById)

router.post('/', authenticate, upload.single('image'),adminOnly, validate(createBookValidation), book.create)

router.put('/:id',adminOnly,upload.single('image'), validate(updateBookValidation), book.update)

router.delete('/:id',adminOnly, book.remove)

export default router;