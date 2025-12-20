import { Router } from "express";
import { login } from "../controllers/user.controller";
import { register } from "../services/user.service";
const router = Router();
router.post('/register', register);
router.post('/login', login);
export default router;
//# sourceMappingURL=user.router.js.map