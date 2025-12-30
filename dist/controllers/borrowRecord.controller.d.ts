import type { Request, Response } from "express";
import type { BorrowRecordService } from "../services/borrowRecord.service";
export declare class BorrowRecordController {
    private borrowService;
    constructor(borrowService: BorrowRecordService);
    createBorrow: (req: Request, res: Response) => Promise<void>;
    returnBorrow: (req: Request, res: Response) => Promise<void>;
    getMyBorrows: (req: Request, res: Response) => Promise<void>;
    getAllBorrows: (req: Request, res: Response) => Promise<void>;
    getBorrowById: (req: Request, res: Response) => Promise<void>;
    deleteBorrow: (req: Request, res: Response) => Promise<void>;
    getStats: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=borrowRecord.controller.d.ts.map