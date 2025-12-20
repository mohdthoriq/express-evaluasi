import { successResponse } from "../utils/response";
import { createBook, deleteBook, getAllBooks, getBookById, searchBooks, updateBook } from "../services/product.service";
import { books } from "../models/product.model";
export const getAll = (_req, res) => {
    const { books, total } = getAllBooks();
    successResponse(res, "Daftar buku ditemukan", {
        jumlah: total,
        data: books
    });
};
export const getByCategory = (req, res) => {
    const { category } = req.params;
    const filtered = books.filter(book => book.category === category);
    if (filtered.length === 0) {
        throw new Error(`Tidak ada buku di kategori '${category}'`);
    }
    res.status(200).json({
        success: true,
        message: `Semua buku kategori ${category}`,
        data: filtered
    });
};
export const getByCategoryId = (req, res) => {
    const { category, id } = req.params;
    if (category !== "komik" && category !== "novel") {
        return res.status(400).json({ message: "Kategori tidak valid" });
    }
    if (!id) {
        return res.status(400).json({ message: "ID tidak ditemukan" });
    }
    const filtered = books.filter(book => book.category === category);
    const book = filtered.find(b => b.id === Number(id));
    if (!book) {
        return res.status(404).json({ message: "Buku tidak ditemukan" });
    }
    return res.status(200).json({
        success: true,
        message: "Buku ditemukan",
        data: book
    });
};
export const search = (req, res) => {
    const { name, max_price, min_price } = req.query;
    const result = searchBooks(name?.toString(), max_price?.toString(), min_price?.toString());
    successResponse(res, "Hasil pencarian ditemukan", result);
};
export const create = (req, res) => {
    const { judul, penulis, tahun, harga, category } = req.body;
    if (!category) {
        throw new Error("Kategori wajib diisi");
    }
    const exists = books.find(book => book.judul === judul && book.category === category);
    if (exists) {
        throw new Error(`Buku dengan judul '${judul}' di kategori '${category}' sudah ada`);
    }
    const newBook = createBook(judul, penulis, tahun, harga, category);
    successResponse(res, "Buku berhasil ditambahkan", newBook, null, 201);
};
export const update = (req, res) => {
    if (!req.params.id) {
        throw new Error("ID tidak ditemukan");
    }
    const book = updateBook(req.params.id, req.body);
    successResponse(res, "Buku berhasil diperbarui", book);
};
export const remove = (req, res) => {
    const deleted = deleteBook(req.params.id);
    successResponse(res, "Buku berhasil dihapus", deleted);
};
//# sourceMappingURL=product.controller.js.map