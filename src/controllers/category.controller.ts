import type { Request, Response } from "express";
import { successResponse } from "../utils/response";
import type { ICategoryService } from "../services/category.service";

export class CategoryController {
  constructor(private categoryService: ICategoryService) {}

  getAll = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await this.categoryService.getAllCategories({
      page,
      limit,
    });

    const pagination = {
      page: result.currentPage,
      limit,
      total: result.total,
      totalPages: result.totalPages,
    };

    successResponse(
      res,
      "Daftar kategori ditemukan",
      result.data,
      pagination
    );
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) throw new Error("ID tidak ditemukan");

    const result = await this.categoryService.getCategoryById(id);

    successResponse(
      res,
      "Kategori ditemukan",
      result
    );
  };

  create = async (req: Request, res: Response) => {
    const { name } = req.body;

    const result = await this.categoryService.createCategory(name);

    successResponse(
      res,
      "Kategori berhasil ditambahkan",
      result
    );
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) throw new Error("ID tidak ditemukan");

    const { name } = req.body;

    const result = await this.categoryService.updateCategory(id, name);

    successResponse(
      res,
      "Kategori berhasil diperbarui",
      result
    );
  };

    remove = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id) throw new Error("ID tidak ditemukan");

        const result = await this.categoryService.deleteCategory(id);

        successResponse(
            res,
            "Kategori berhasil dihapus",
            result
        );
    };

    getStats = async (req: Request, res: Response) => {
        const stats = await this.categoryService.execStats()

        successResponse(
            res,
            "Success",
            stats,
            null,
            200
        )
    }
}
