import { Router } from "express";
import { validate } from "../utils/validator";
import { createProfileValidation, updateProfileValidation } from "../validations/profile.validation";
import { PrismaInstance } from "../database";
import { authenticate } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware";
import { ProfileRepository } from "../repositories/profile.repository";
import { ProfileService } from "../services/profile.service";
import { ProfileController } from "../controllers/profile.controller";
const router = Router();
const repo = new ProfileRepository(PrismaInstance);
const service = new ProfileService(repo);
const controller = new ProfileController(service);
/**
 * @swagger
 * tags:
 *   - name: Profile
 *     description: Manajemen profile user
 */
/**
 * @swagger
 * /profiles:
 *   post:
 *     summary: Buat profile baru
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               gender:
 *                 type: string
 *                 example: Male
 *               address:
 *                 type: string
 *                 example: Jalan Mawar No. 5
 *               profile_picture_url:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Profile berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile berhasil dibuat
 *                 data:
 *                   $ref: '#/components/schemas/Profile'
 */
/**
 * @swagger
 * /profiles/{id}:
 *   get:
 *     summary: Ambil profile berdasarkan ID
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID profile
 *     responses:
 *       200:
 *         description: Profile berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile berhasil diambil
 *                 data:
 *                   $ref: '#/components/schemas/Profile'
 */
/**
 * @swagger
 * /profiles/{id}:
 *   put:
 *     summary: Update profile
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               gender:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile berhasil diupdate
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile berhasil diupdate
 *                 data:
 *                   $ref: '#/components/schemas/Profile'
 */
/**
 * @swagger
 * /profiles/{id}:
 *   delete:
 *     summary: Hapus profile
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID profile
 *     responses:
 *       200:
 *         description: Profile berhasil dihapus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile berhasil dihapus
 *                 data:
 *                   $ref: '#/components/schemas/Profile'
 */
router.get('/:id', controller.getById);
router.post('/', authenticate, upload.single('profile_picture_url'), validate(createProfileValidation), controller.create);
router.put('/:id', validate(updateProfileValidation), controller.update);
router.delete('/:id', controller.remove);
export default router;
//# sourceMappingURL=profile.routes.js.map