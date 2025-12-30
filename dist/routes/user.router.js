import { Router } from "express";
import { AuthController } from "../controllers/user.controller";
import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "../services/user.service";
import { PrismaInstance } from "../database";
const router = Router();
const repo = new UserRepository(PrismaInstance);
const service = new AuthService(repo);
const controller = new AuthController(service);
router.post('/register', controller.register);
router.post('/login', controller.login);
export default router;
//# sourceMappingURL=user.router.js.map