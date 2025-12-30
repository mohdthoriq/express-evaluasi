import { Router } from "express";
import { validate } from "../middlewares/product.validation";
import { createCategoryValidation, getCategoryByIdValidation, updateCategoryValidation } from "../validations/category.validation";
import { CategoryRepository } from "../repositories/category.repository";
import { CategoryService } from "../services/category.service";
import { CategoryController } from "../controllers/category.controller";
import { PrismaInstance } from "../database";

const router = Router()

const repo = new CategoryRepository(PrismaInstance);
const service = new CategoryService(repo);
const controller = new CategoryController(service);

/**
 * @swagger
 * tags:
 *   - name: Category
 *     description: Manajemen kategori buku
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Ambil daftar kategori (pagination & search)
 *     tags: [Category]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: programming
 *     responses:
 *       200:
 *         description: Daftar kategori berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sukses
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 */

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Ambil detail kategori
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID kategori
 *     responses:
 *       200:
 *         description: Detail kategori berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sukses
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 */

/**
 * @swagger
 * /categories/stats:
 *   get:
 *     summary: Statistik kategori
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Statistik kategori berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sukses
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       books:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             price:
 *                               type: number
 *                             stock:
 *                               type: number
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Tambah kategori baru
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Programming
 *     responses:
 *       201:
 *         description: Kategori berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Kategori berhasil dibuat
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 */

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update kategori
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID kategori yang akan diupdate
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: New Category Name
 *     responses:
 *       200:
 *         description: Kategori berhasil diupdate
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Kategori berhasil diupdate
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 */

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Hapus kategori
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID kategori yang akan dihapus
 *     responses:
 *       200:
 *         description: Kategori berhasil dihapus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Kategori berhasil dihapus
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 */
router.get('/', controller.getAll)
router.get('/stats', controller.getStats)
router.get('/:id', validate(getCategoryByIdValidation), controller.getById)
router.post('/', validate(createCategoryValidation), controller.create)
router.put('/:id', validate(updateCategoryValidation), controller.update)
router.delete('/:id', controller.remove)

export default router;