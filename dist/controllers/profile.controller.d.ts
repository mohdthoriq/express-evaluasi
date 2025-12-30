import type { Request, Response } from "express";
import type { ProfileService } from "../services/profile.service";
export declare class ProfileController {
    private profileService;
    constructor(profileService: ProfileService);
    create: (req: Request, res: Response) => Promise<void>;
    getById: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    remove: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=profile.controller.d.ts.map