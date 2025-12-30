import { Router } from "express";
import { validate } from "../middlewares/product.validation";
import { createBookValidation, getBookByIdValidation, updateBookValidation } from "../validations/book.validation";
import { authenticate } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware";
import { adminOnly } from "../middlewares/role.middleware";
import { BookRepository } from "../repositories/book.repository";
import { BookService } from "../services/book.service";
import { BookController } from "../controllers/book.controller";
import PrismaInstance from "../database";



const router = Router()

const repo = new BookRepository(PrismaInstance);
const service = new BookService(repo);
const controller = new BookController(service);

/**
 * @swagger
 * tags:
 *   - name: Book
 *     description: Manajemen buku
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Ambil daftar buku dengan pagination, search & filter
 *     tags: [Book]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Halaman yang ingin diambil
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Jumlah buku per halaman
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: Harry Potter
 *         description: Keyword pencarian berdasarkan judul atau penulis
 *       - in: query
 *         name: category
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           example: ["fantasy","novel"]
 *         description: Filter berdasarkan kategori (boleh multiple)
 *       - in: query
 *         name: inStock
 *         schema:
 *           type: boolean
 *           example: true
 *         description: Filter buku yang tersedia
 *       - in: query
 *         name: yearFrom
 *         schema:
 *           type: integer
 *           example: 2000
 *         description: Tahun terbit dari
 *       - in: query
 *         name: yearTo
 *         schema:
 *           type: integer
 *           example: 2023
 *         description: Tahun terbit sampai
 *     responses:
 *       200:
 *         description: Daftar buku berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       author:
 *                         type: string
 *                       year:
 *                         type: integer
 *                       price:
 *                         type: number
 *                       stock:
 *                         type: number
 *                       category:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 */
router.get('/', controller.getAll)

/**
 * @swagger
 * /books/stats:
 *   get:
 *     summary: Ambil statistik buku (admin only)
 *     tags: [Book]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistik buku berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 overView:
 *                   type: object
 *                   properties:
 *                     totalBooks:
 *                       type: number
 *                     totalCategories:
 *                       type: number
 *                     totalAuthors:
 *                       type: number
 *                 byCategory:
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
 *       401:
 *         description: Unauthorized / token invalid
 *       403:
 *         description: Forbidden, admin only
 */
router.get("/stats", authenticate, adminOnly, controller.getStats)

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Ambil detail buku berdasarkan ID
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "b1234"
 *         description: ID buku yang ingin diambil
 *     responses:
 *       200:
 *         description: Detail buku berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 *                 year:
 *                   type: integer
 *                 price:
 *                   type: number
 *                 stock:
 *                   type: number
 *                 category:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *       404:
 *         description: Buku tidak ditemukan
 */
router.get('/:id', validate(getBookByIdValidation), controller.getById)

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Tambah buku baru (admin only)
 *     tags: [Book]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "b1234"
 *               title:
 *                 type: string
 *                 example: Buku Pemrograman
 *               author:
 *                 type: string
 *                 example: John Doe
 *               year:
 *                 type: integer
 *                 example: 2025
 *               price:
 *                 type: number
 *                 example: 150000
 *               categoryId:
 *                 type: string
 *                 example: cat123
 *               image:
 *                 type: string
 *                 format: binary
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-12-29T00:00:00.000Z"
 *               updatedAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-12-29T00:00:00.000Z"
 *     responses:
 *       201:
 *         description: Buku berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Buku berhasil dibuat
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       401:
 *         description: Unauthorized / token invalid
 *       403:
 *         description: Forbidden, admin only
 *       422:
 *         description: Validasi input gagal
 */
router.post('/', authenticate, upload.single('image'),adminOnly, validate(createBookValidation), controller.create)

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update buku (admin only)
 *     tags: [Book]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID buku yang ingin diupdate
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Buku Pemrograman Lanjutan
 *               author:
 *                 type: string
 *                 example: Jane Doe
 *               year:
 *                 type: integer
 *                 example: 2025
 *               price:
 *                 type: number
 *                 example: 200000
 *               categoryId:
 *                 type: string
 *                 example: cat123
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Buku berhasil diupdate
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Buku berhasil diupdate
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       401:
 *         description: Unauthorized / token invalid
 *       403:
 *         description: Forbidden, admin only
 *       404:
 *         description: Buku tidak ditemukan
 */
router.put('/:id',adminOnly,upload.single('image'), validate(updateBookValidation), controller.update)

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Hapus buku (admin only)
 *     tags: [Book]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID buku yang ingin dihapus
 *     responses:
 *       200:
 *         description: Buku berhasil dihapus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Buku berhasil dihapus
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       401:
 *         description: Unauthorized / token invalid
 *       403:
 *         description: Forbidden, admin only
 *       404:
 *         description: Buku tidak ditemukan
 */
router.delete('/:id',adminOnly, controller.remove)

export default router;