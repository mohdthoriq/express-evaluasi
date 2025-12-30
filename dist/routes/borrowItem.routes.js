import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { adminOnly } from "../middlewares/role.middleware";
import { BorrowItemRepository } from "../repositories/borrowItem.repository";
import { BorrowItemService } from "../services/borrow_Item.service";
import { BorrowItemController } from "../controllers/borrow_Item.controller";
import { PrismaInstance } from "../database";
const router = Router();
const repo = new BorrowItemRepository(PrismaInstance);
const service = new BorrowItemService(repo);
const controller = new BorrowItemController(service);
/**
 * @swagger
 * tags:
 *   - name: BorrowItem
 *     description: Manajemen item peminjaman
 */
/**
 * @swagger
 * /borrow-items/stats:
 *   get:
 *     summary: Statistik item peminjaman
 *     tags: [BorrowItem]
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
 *                   properties:
 *                     total:
 *                       type: integer
 *                     byBook:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           bookId:
 *                             type: string
 *                           quantitySum:
 *                             type: integer
 */
/**
 * @swagger
 * /borrow-items:
 *   get:
 *     summary: Ambil semua item peminjaman
 *     tags: [BorrowItem]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar item peminjaman berhasil diambil
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
 *                     $ref: '#/components/schemas/BorrowItem'
 */
/**
 * @swagger
 * /borrow-items/{id}:
 *   get:
 *     summary: Ambil detail item peminjaman berdasarkan ID
 *     tags: [BorrowItem]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID item peminjaman
 *     responses:
 *       200:
 *         description: Detail item peminjaman berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sukses
 *                 data:
 *                   $ref: '#/components/schemas/BorrowItem'
 */
router.get("/", authenticate, adminOnly, controller.getAllItems);
router.get("/stats", authenticate, adminOnly, controller.getStats);
router.get("/:id", authenticate, adminOnly, controller.getItemById);
export default router;
//# sourceMappingURL=borrowItem.routes.js.map