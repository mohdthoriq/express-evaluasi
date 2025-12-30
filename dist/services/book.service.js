export class BookService {
    bookRepo;
    constructor(bookRepo) {
        this.bookRepo = bookRepo;
    }
    async getAllBooks(params) {
        const { page, limit, search, sortBy, sortOrder } = params;
        const skip = (page - 1) * limit;
        const where = {
            deletedAt: null,
            ...(search && {
                OR: [
                    { title: { contains: search, mode: "insensitive" } },
                    { author: { contains: search, mode: "insensitive" } },
                ],
            }),
        };
        const orderBy = sortBy
            ? { [sortBy]: sortOrder || "desc" }
            : { createdAt: "desc" };
        const { books, total } = await this.bookRepo.findAll({
            skip,
            take: limit,
            where,
            orderBy,
        });
        return {
            data: books,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
        };
    }
    async getBookById(id) {
        const book = await this.bookRepo.findById(id);
        if (!book) {
            throw new Error("Buku tidak ditemukan");
        }
        return book;
    }
    async createBook(data) {
        const { title, author, year, price, image, categoryId } = data;
        if (isNaN(price)) {
            throw new Error("Harga harus berupa angka");
        }
        if (isNaN(year) || year.toString().length !== 4) {
            throw new Error("Tahun harus 4 digit");
        }
        return this.bookRepo.create({
            title,
            author,
            year,
            price,
            image,
            categoryId,
        });
    }
    async updateBook(id, data) {
        const existing = await this.bookRepo.findById(id);
        if (!existing) {
            throw new Error("Buku tidak ditemukan");
        }
        return this.bookRepo.update(id, data);
    }
    async deleteBook(id) {
        const existing = await this.bookRepo.findById(id);
        if (!existing) {
            throw new Error("Buku tidak ditemukan");
        }
        await this.bookRepo.softDelete(id);
    }
    async findByIdTx(tx, id) {
        return this.bookRepo.findByIdTx(tx, id);
    }
    async decrementStockTx(tx, id, qty) {
        return this.bookRepo.decrementStock(tx, id, qty);
    }
    async incrementStockTx(tx, id, qty) {
        return this.bookRepo.incrementStock(tx, id, qty);
    }
    async exec() {
        const stats = await this.bookRepo.getStats();
        const categoryStats = await this.bookRepo.getBooksByCategoryStats();
        return {
            overView: stats,
            byCategory: categoryStats
        };
    }
}
//# sourceMappingURL=book.service.js.map