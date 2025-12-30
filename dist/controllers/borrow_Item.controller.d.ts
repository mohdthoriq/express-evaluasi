import type { Request, Response } from "express";
import type { BorrowItemService } from "../services/borrow_Item.service";
export declare class BorrowItemController {
    private borrowItemService;
    constructor(borrowItemService: BorrowItemService);
    getAllItems: (req: Request, res: Response) => Promise<void>;
    getItemById: (req: Request, res: Response) => Promise<void>;
    getStats: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=borrow_Item.controller.d.ts.map