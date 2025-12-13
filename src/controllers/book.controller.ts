import type { Request, Response } from "express";
import * as book from "../services/book.service";
import { successResponse } from "../utils/response";

export const getAll = async(req: Request, res: Response) => {
    const { books, total } = await book.getAllBooks();

    successResponse(
        res,
        "Daftar buku ditemukan",
        {
            jumlah: total,
            data: books
        }
    )
}

export const getById = async(req: Request, res: Response) => {
    if (!req.params.id) {
        throw new Error("ID tidak ditemukan");
    }

    const product = await book.getBookById(req.params.id);

    successResponse(
        res,
        "Buku ditemukan",
        product
    )
}

export const search = async(req: Request, res: Response) => {
    const { name, max_price, min_price } = req.query;

    const results = await book.searchBooks(
        name?.toString(),
        max_price?.toString(),
        min_price?.toString()
    )

    successResponse(
        res,
        "Hasil pencarian ditemukan",
        results,
    )
}

export const create = async(req: Request, res: Response) => {
    const { title, author, year, price, categoryId } = req.body;

    if (!categoryId) throw new Error("Kategori harus diisi");

    const result = await book.createBook(
        title, author, year, price, categoryId
    )

    successResponse(
        res,
        "Buku berhasil ditambahkan",
        result,
    )
}

export const update = async(req: Request, res: Response) => {
    if (!req.params.id) {
        throw new Error("ID tidak ditemukan");
    }

    const result = await book.updateBook(req.params.id!, req.body);

    successResponse(
        res, "Buku berhasil diperbarui", result
    )
}

export const remove = async(req: Request, res: Response) => {
    const deleted = await book.deleteBook(req.params.id!);

    successResponse(
        res,
        "Buku berhasil dihapus",
        deleted,
    )
}

