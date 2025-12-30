import type { Request, Response } from "express";
import type { AuthService } from "../services/user.service.js";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login: (req: Request, res: Response) => Promise<void>;
    register: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=user.controller.d.ts.map
