import type { Request, Response } from "express";
import type { ICategoryService } from "../services/category.service";
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: ICategoryService);
    getAll: (req: Request, res: Response) => Promise<void>;
    getById: (req: Request, res: Response) => Promise<void>;
    create: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    remove: (req: Request, res: Response) => Promise<void>;
    getStats: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=category.controller.d.ts.map