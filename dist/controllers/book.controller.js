import * as book from "../services/book.service";
import { successResponse } from "../utils/response";
export const getAll = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search;
    const sortBy = req.query.sortBy;
    const sortOrder = req.query.sortOrder;
    const result = await book.getAllBooks({
        page,
        limit,
        search,
        sortBy,
        sortOrder,
    });
    const pagination = {
        page: result.currentPage,
        limit,
        total: result.total,
        totalPages: result.totalPages,
    };
    successResponse(res, "Daftar buku ditemukan", result.data, pagination);
};
export const getById = async (req, res) => {
    if (!req.params.id) {
        throw new Error("ID tidak ditemukan");
    }
    const product = await book.getBookById(req.params.id);
    successResponse(res, "Buku ditemukan", product);
};
export const create = async (req, res) => {
    const file = req.file;
    if (!file)
        throw new Error("image is required");
    const { title, author, year, price, categoryId } = req.body;
    const imageURL = `/public/uploads/${file.filename}`;
    if (!categoryId)
        throw new Error("Kategori harus diisi");
    const result = await book.createBook({
        title: String(title),
        author: String(author),
        year: Number(year),
        price: Number(price),
        image: imageURL,
        categoryId: String(categoryId)
    });
    successResponse(res, "Buku berhasil ditambahkan", result);
};
export const update = async (req, res) => {
    if (!req.params.id) {
        throw new Error("ID tidak ditemukan");
    }
    const result = await book.updateBook(req.params.id, req.body);
    successResponse(res, "Buku berhasil diperbarui", result);
};
export const remove = async (req, res) => {
    const deleted = await book.deleteBook(req.params.id);
    successResponse(res, "Buku berhasil dihapus", deleted);
};
//# sourceMappingURL=book.controller.js.map