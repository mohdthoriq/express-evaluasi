import type { Request, Response } from "express"
import * as service from "../services/borrowRecord.service"
import { successResponse } from "../utils/response"

export const createBorrow = async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("User tidak ditemukan")
  }

  const userId = req.user.id
  const { items } = req.body

  const result = await service.createBorrow(userId, items)
  successResponse(res, "Peminjaman berhasil", result)
}

export const returnBorrow = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  const result = await service.returnBorrow(id)

  successResponse(res, "Peminjaman berhasil dikembalikan", result)
}

export const getMyBorrows = async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("User tidak ditemukan")
  }

  const userId = req.user.id
  const data = await service.getMyBorrows(userId)

  successResponse(res, "Peminjaman ditemukan", data)
}

export const getAllBorrows = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10

  const result = await service.getAllBorrows({ page, limit })

  const pagination = {
    page,
    limit,
    total: result.total,
    totalPages: Math.ceil(result.total / limit),
  }

  successResponse(
    res,
    "Peminjaman ditemukan",
    result.items,
    pagination
  )
}

export const getBorrowById = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const data = await service.getBorrowById(id)

  successResponse(res, "Peminjaman ditemukan", data)
}

export const deleteBorrow = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  const result = await service.deleteBorrow(id)

 successResponse(res, "Peminjaman berhasil dihapus", result)
}

