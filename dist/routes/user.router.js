import { Router } from "express";
import { AuthController } from "../controllers/user.controller";
import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "../services/user.service";
import { PrismaInstance } from "../database";
const router = Router();
const repo = new UserRepository(PrismaInstance);
const service = new AuthService(repo);
const controller = new AuthController(service);
/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication user
 */
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrasi user baru
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               role:
 *                 type: string
 *                 example: USER
 *     responses:
 *       201:
 *         description: User berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Registrasi berhasil
 *                 data:
 *                   $ref: '#/components/schemas/User'
 */
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login berhasil
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Email atau password salah
 */
router.post('/register', controller.register);
router.post('/login', controller.login);
export default router;
//# sourceMappingURL=user.router.js.map