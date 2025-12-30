import type { Request, Response } from "express";
import type { IBookService } from "../services/book.service.js";
export declare class BookController {
    private bookService;
    constructor(bookService: IBookService);
    getAll: (req: Request, res: Response) => Promise<void>;
    getById: (req: Request, res: Response) => Promise<void>;
    create: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    remove: (req: Request, res: Response) => Promise<void>;
    getStats: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=book.controller.d.ts.map
