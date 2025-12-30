import type { Request, Response } from "express";
import { successResponse } from "../utils/response";
import type { BorrowItemService } from "../services/borrow_Item.service";

export class BorrowItemController {
  constructor(private borrowItemService: BorrowItemService) {}

  getAllItems = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await this.borrowItemService.getAllItems({
      page,
      limit,
    });

    const pagination = {
      page,
      limit,
      total: result.total,
      totalPages: Math.ceil(result.total / limit),
    };

    successResponse(
      res,
      "Data ditemukan",
      result.items,
      pagination
    );
  };

  getItemById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      throw new Error("ID tidak valid");
    }

    const data = await this.borrowItemService.getItemById(id);

    successResponse(res, "Data ditemukan", data);
  };

  getStats = async (req: Request, res: Response) => {
    const stats = await this.borrowItemService.exec()

    successResponse(res, "Borrow item stats retrieved successfully", stats)
  }
}
