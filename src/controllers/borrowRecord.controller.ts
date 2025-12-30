import type { Request, Response } from "express";
import type { BorrowRecordService } from "../services/borrowRecord.service";
import { successResponse } from "../utils/response";

export class BorrowRecordController {
  constructor(private borrowService: BorrowRecordService) {}

  createBorrow = async (req: Request, res: Response) => {
    if (!req.user) {
      throw new Error("User tidak ditemukan");
    }

    const userId = req.user.id;
    const { items } = req.body;

    const result = await this.borrowService.createBorrow(userId, items);

    successResponse(res, "Peminjaman berhasil", result);
  };

  returnBorrow = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      throw new Error("ID tidak valid");
    }

    const result = await this.borrowService.returnBorrow(id);

    successResponse(res, "Peminjaman berhasil dikembalikan", result);
  };

  getMyBorrows = async (req: Request, res: Response) => {
    if (!req.user) {
      throw new Error("User tidak ditemukan");
    }

    const userId = req.user.id;
    const data = await this.borrowService.getMyBorrows(userId);

    successResponse(res, "Peminjaman ditemukan", data);
  };

  getAllBorrows = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await this.borrowService.getAllBorrows({
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
      "Peminjaman ditemukan",
      result.items,
      pagination
    );
  };

  getBorrowById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      throw new Error("ID tidak valid");
    }

    const data = await this.borrowService.getBorrowById(id);

    successResponse(res, "Peminjaman ditemukan", data);
  };

  deleteBorrow = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      throw new Error("ID tidak valid");
    }

    const result = await this.borrowService.deleteBorrow(id);

    successResponse(res, "Peminjaman berhasil dihapus", result);
  };

  getStats = async (req: Request, res: Response) => {
    const result = await this.borrowService.exec();

    successResponse(res, "Peminjaman ditemukan", result);
  };
}
