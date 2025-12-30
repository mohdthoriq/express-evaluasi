import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { adminOnly } from "../middlewares/role.middleware";
import { BorrowRecordRepository } from "../repositories/borrowRecord.repository";
import { BorrowRecordService } from "../services/borrowRecord.service";
import { BorrowRecordController } from "../controllers/borrowRecord.controller";
import { PrismaInstance } from "../database";
import { BookRepository } from "../repositories/book.repository";
const router = Router();
const repo = new BorrowRecordRepository(PrismaInstance);
const bookRepo = new BookRepository(PrismaInstance);
const service = new BorrowRecordService(repo, bookRepo, PrismaInstance);
const controller = new BorrowRecordController(service);
/**
 * @swagger
 * tags:
 *   - name: BorrowRecord
 *     description: Manajemen peminjaman buku
 */
/**
 * @swagger
 * /borrow-records:
 *   post:
 *     summary: Buat peminjaman baru
 *     tags: [BorrowRecord]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     bookId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Peminjaman berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Peminjaman berhasil dibuat
 *                 data:
 *                   $ref: '#/components/schemas/BorrowRecord'
 */
/**
 * @swagger
 * /borrow-records/stats:
 *   get:
 *     summary: Statistik peminjaman
 *     tags: [BorrowRecord]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistik berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sukses
 *                 data:
 *                   type: object
 */
/**
 * @swagger
 * /borrow-records/me:
 *   get:
 *     summary: Ambil peminjaman milik user yang login
 *     tags: [BorrowRecord]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar peminjaman user berhasil diambil
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
 *                     $ref: '#/components/schemas/BorrowRecord'
 */
/**
 * @swagger
 * /borrow-records:
 *   get:
 *     summary: Ambil semua peminjaman (admin)
 *     tags: [BorrowRecord]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar peminjaman berhasil diambil
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
 *                     $ref: '#/components/schemas/BorrowRecord'
 */
/**
 * @swagger
 * /borrow-records/{id}:
 *   get:
 *     summary: Ambil peminjaman berdasarkan ID (admin)
 *     tags: [BorrowRecord]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID peminjaman
 *     responses:
 *       200:
 *         description: Detail peminjaman berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sukses
 *                 data:
 *                   $ref: '#/components/schemas/BorrowRecord'
 */
/**
 * @swagger
 * /borrow-records/{id}/return:
 *   put:
 *     summary: Kembalikan peminjaman
 *     tags: [BorrowRecord]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID peminjaman
 *     responses:
 *       200:
 *         description: Peminjaman berhasil dikembalikan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Peminjaman berhasil dikembalikan
 *                 data:
 *                   $ref: '#/components/schemas/BorrowRecord'
 */
/**
 * @swagger
 * /borrow-records/{id}:
 *   delete:
 *     summary: Hapus peminjaman (admin)
 *     tags: [BorrowRecord]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID peminjaman
 *     responses:
 *       200:
 *         description: Peminjaman berhasil dihapus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Peminjaman berhasil dihapus
 *                 data:
 *                   $ref: '#/components/schemas/BorrowRecord'
 */
router.post("/", authenticate, controller.createBorrow);
router.get("/stats", authenticate, adminOnly, controller.getStats);
router.get("/me", authenticate, controller.getMyBorrows);
router.get("/", authenticate, adminOnly, controller.getAllBorrows);
router.get("/:id", authenticate, adminOnly, controller.getBorrowById);
router.put("/:id/return", authenticate, controller.returnBorrow);
router.delete("/:id", authenticate, adminOnly, controller.deleteBorrow);
export default router;
//# sourceMappingURL=borrowRecord.routes.js.map