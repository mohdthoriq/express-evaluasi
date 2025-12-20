import type { Request, Response } from "express";
import * as category from "../services/category.service";
import { successResponse } from "../utils/response";

export const getAll = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10

  const result = await category.getAllCategories({
    page,
    limit
  })

  const pagination = {
    page,
    limit,
    total: result.total,
    totalPages: Math.ceil(result.total / limit),
  }

  successResponse(
    res,
    "Daftar kategori ditemukan",
    result.categories,
    pagination
  )
}

export const getById = async (req: Request, res: Response) => {
    if (!req.params.id) {
        throw new Error("ID tidak ditemukan");
    }

    const result = await category.getCategoryById(req.params.id);

    successResponse(
        res,
        "Kategori ditemukan",
        result
    )

}

export const create = async (req: Request, res: Response) => {
    const { name } = req.body;

    const result = await category.createCategory(name);

    successResponse(
        res,
        "Kategori berhasil ditambahkan",
        result
    )
}

export const update = async (req: Request, res: Response) => {
    if (!req.params.id) {
        throw new Error("ID tidak ditemukan");
    }

    const { name } = req.body;
    const result = await category.updateCategory(req.params.id!, name);

    successResponse(
        res,
        "Kategori berhasil diperbarui",
        result,
    )
}

export const remove = async (req: Request, res: Response) => {
    if (!req.params.id) {
        throw new Error("ID tidak ditemukan");
    }

    const deleted = await category.deleteCategory(req.params.id);

    successResponse(
        res,
        "Kategori berhasil dihapus",
        deleted,
    )

}