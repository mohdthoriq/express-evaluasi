import { body, param, query } from "express-validator";
export const createCategoryValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Nama kategori wajib diisi")
        .isLength({ min: 3, max: 50 })
        .withMessage("Nama kategori minimal 3 dan maksimal 50 karakter"),
];
export const updateCategoryValidation = [
    param("id")
        .isUUID()
        .withMessage("ID kategori harus UUID"),
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Nama kategori wajib diisi")
        .isLength({ min: 3, max: 50 })
        .withMessage("Nama kategori minimal 3 dan maksimal 50 karakter"),
];
export const getCategoryByIdValidation = [
    param("id")
        .isUUID()
        .withMessage("ID kategori harus UUID"),
];
export const searchCategoryValidation = [
    query("q")
        .optional()
        .isString()
        .withMessage("Keyword harus string"),
];
//# sourceMappingURL=category.validation.js.map