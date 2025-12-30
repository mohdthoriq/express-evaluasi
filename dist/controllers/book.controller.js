import { successResponse } from "../utils/response";
export class BookController {
    bookService;
    constructor(bookService) {
        this.bookService = bookService;
    }
    getAll = async (req, res) => {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search;
        const sortBy = req.query.sortBy;
        const sortOrder = req.query.sortOrder;
        const result = await this.bookService.getAllBooks({
            page,
            limit,
            search,
            sortBy,
            sortOrder,
        });
        successResponse(res, "Daftar buku ditemukan", result.data, {
            page: result.currentPage,
            limit,
            total: result.total,
            totalPages: result.totalPages,
        });
    };
    getById = async (req, res) => {
        if (!req.params.id) {
            throw new Error("ID tidak ditemukan");
        }
        const book = await this.bookService.getBookById(req.params.id);
        successResponse(res, "Buku ditemukan", book);
    };
    create = async (req, res) => {
        const file = req.file;
        if (!file)
            throw new Error("image is required");
        const { title, author, year, price, categoryId } = req.body;
        if (!categoryId)
            throw new Error("Kategori harus diisi");
        const imageURL = `/public/uploads/${file.filename}`;
        const result = await this.bookService.createBook({
            title: String(title),
            author: String(author),
            year: Number(year),
            price: Number(price),
            image: imageURL,
            categoryId: String(categoryId),
        });
        successResponse(res, "Buku berhasil ditambahkan", result);
    };
    update = async (req, res) => {
        if (!req.params.id) {
            throw new Error("ID tidak ditemukan");
        }
        const result = await this.bookService.updateBook(req.params.id, req.body);
        successResponse(res, "Buku berhasil diperbarui", result);
    };
    remove = async (req, res) => {
        await this.bookService.deleteBook(req.params.id);
        successResponse(res, "Buku berhasil dihapus");
    };
    getStats = async (req, res) => {
        const stats = await this.bookService.exec();
        successResponse(res, "Success", stats, null, 200);
    };
}
//# sourceMappingURL=book.controller.js.map