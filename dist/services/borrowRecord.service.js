export class BorrowRecordService {
    borrowRepo;
    bookRepo;
    prisma;
    constructor(borrowRepo, bookRepo, prisma) {
        this.borrowRepo = borrowRepo;
        this.bookRepo = bookRepo;
        this.prisma = prisma;
    }
    async createBorrow(userId, items) {
        if (!items || items.length === 0) {
            throw new Error("Item peminjaman kosong");
        }
        return this.prisma.$transaction(async (tx) => {
            // 1. cek stok + kurangi
            for (const item of items) {
                const book = await this.bookRepo.findByIdTx(tx, item.bookId);
                if (!book)
                    throw new Error("Buku tidak ditemukan");
                if (book.stock < item.quantity) {
                    throw new Error(`Stok ${book.title} tidak cukup`);
                }
                await this.bookRepo.decrementStock(tx, book.id, item.quantity);
            }
            // 2. create borrow record
            return this.borrowRepo.createBorrowRecord(tx, {
                userId,
                items,
            });
        });
    }
    async returnBorrow(borrowId) {
        return this.prisma.$transaction(async (tx) => {
            const borrow = await this.borrowRepo.findBorrowByIdTx(tx, borrowId);
            if (!borrow)
                throw new Error("Data peminjaman tidak ditemukan");
            if (borrow.returnDate)
                throw new Error("Buku sudah dikembalikan");
            // balikin stok
            for (const item of borrow.items) {
                await this.bookRepo.incrementStock(tx, item.bookId, item.quantity);
            }
            return this.borrowRepo.updateReturnDate(tx, borrowId);
        });
    }
    async getMyBorrows(userId) {
        return this.borrowRepo.findBorrowsByUserId(userId);
    }
    async getAllBorrows({ page, limit }) {
        const skip = (page - 1) * limit;
        const { items, total } = await this.borrowRepo.findAll({
            skip,
            take: limit,
        });
        return { items, total };
    }
    async getBorrowById(id) {
        const data = await this.borrowRepo.findById(id);
        if (!data)
            throw new Error("Peminjaman tidak ditemukan");
        return data;
    }
    async deleteBorrow(borrowId) {
        return this.borrowRepo.deleteById(borrowId);
    }
    async exec() {
        const totalStats = await this.borrowRepo.getStats(); // total borrow record
        const byUserStats = await this.borrowRepo.getBorrowByUserStats(); // jumlah per user
        const byReturnStatusStats = await this.borrowRepo.getBorrowByReturnStatusStats(); // returned vs not returned
        // kalau mau, bisa map returnDate ke boolean
        const mappedReturnStatus = byReturnStatusStats.map(r => ({
            returnDate: r.returnDate !== null,
            _count: r._count
        }));
        return {
            overView: totalStats,
            byUser: byUserStats,
            byReturnStatus: mappedReturnStatus
        };
    }
}
//# sourceMappingURL=borrowRecord.service.js.map