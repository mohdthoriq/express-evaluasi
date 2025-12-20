import type { Request, Response } from "express";
export declare const createBorrow: (req: Request, res: Response) => Promise<void>;
export declare const returnBorrow: (req: Request, res: Response) => Promise<void>;
export declare const getMyBorrows: (req: Request, res: Response) => Promise<void>;
export declare const getAllBorrows: (req: Request, res: Response) => Promise<void>;
export declare const getBorrowById: (req: Request, res: Response) => Promise<void>;
export declare const deleteBorrow: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=borrowRecord.controller.d.ts.map