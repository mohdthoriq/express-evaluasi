import type { Request, Response } from "express";
export declare const getAll: (_req: Request, res: Response) => void;
export declare const getByCategory: (req: Request, res: Response) => void;
export declare const getByCategoryId: (req: Request, res: Response) => Response<any, Record<string, any>>;
export declare const search: (req: Request, res: Response) => void;
export declare const create: (req: Request, res: Response) => void;
export declare const update: (req: Request, res: Response) => void;
export declare const remove: (req: Request, res: Response) => void;
//# sourceMappingURL=product.controller.d.ts.map