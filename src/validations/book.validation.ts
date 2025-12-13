import { body, param, query } from "express-validator";

export const createBookValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Judul wajib diisi")
    .isLength({ min: 3 })
    .withMessage("Judul minimal 3 karakter"),

  body("author")
    .trim()
    .notEmpty()
    .withMessage("Penulis wajib diisi"),

  body("year")
    .isInt({ min: 1000, max: 9999 })
    .withMessage("Tahun harus 4 digit angka"),

  body("price")
    .isInt({ min: 0 })
    .withMessage("Harga harus berupa angka"),

  body("categoryId")
    .isUUID()
    .withMessage("Category ID harus UUID"),
];

export const updateBookValidation = [
  param("id")
    .isUUID()
    .withMessage("ID buku harus UUID"),

  body("title")
    .optional()
    .isString()
    .withMessage("Judul harus string"),

  body("author")
    .optional()
    .isString()
    .withMessage("Penulis harus string"),

  body("year")
    .optional()
    .isInt({ min: 1000, max: 9999 })
    .withMessage("Tahun harus 4 digit"),

  body("price")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Harga harus angka"),
];

export const getBookByIdValidation = [
  param("id")
    .isUUID()
    .withMessage("ID buku harus UUID"),
];

export const searchBookValidation = [
  query("q")
    .optional()
    .isString()
    .withMessage("Keyword harus string"),

  query("min_price")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Min price harus angka"),

  query("max_price")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Max price harus angka"),
];
