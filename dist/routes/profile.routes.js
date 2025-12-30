import { Router } from "express";
import { validate } from "../utils/validator";
import { createProfileValidation, updateProfileValidation } from "../validations/profile.validation";
import { authenticate } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware";
import { ProfileRepository } from "../repositories/profile.repository";
import { ProfileService } from "../services/profile.service";
import { ProfileController } from "../controllers/profile.controller";
import { PrismaInstance } from "../database";
const router = Router();
const repo = new ProfileRepository(PrismaInstance);
const service = new ProfileService(repo);
const controller = new ProfileController(service);
router.get('/:id', controller.getById);
router.post('/', authenticate, upload.single('profile_picture_url'), validate(createProfileValidation), controller.create);
router.put('/:id', validate(updateProfileValidation), controller.update);
router.delete('/:id', controller.remove);
export default router;
//# sourceMappingURL=profile.routes.js.map