import { getPrisma } from "../prisma";
import * as borrowRepo from "../repositories/borrowRecord.repository";
import * as bookRepo from "../repositories/book.repository";
const prisma = getPrisma();
export const createBorrow = async (userId, items) => {
    if (!items || items.length === 0) {
        throw new Error("Item peminjaman kosong");
    }
    return prisma.$transaction(async (tx) => {
        // 1. cek stok + kurangi
        for (const item of items) {
            const book = await bookRepo.findByIdTx(tx, item.bookId);
            if (!book)
                throw new Error("Buku tidak ditemukan");
            if (book.stock < item.quantity) {
                throw new Error(`Stok ${book.title} tidak cukup`);
            }
            await bookRepo.decrementStock(tx, book.id, item.quantity);
        }
        // 2. create borrow record + items
        return borrowRepo.createBorrowRecord(tx, {
            userId,
            items
        });
    });
};
export const returnBorrow = async (borrowId) => {
    return prisma.$transaction(async (tx) => {
        const borrow = await borrowRepo.findBorrowByIdTx(tx, borrowId);
        if (!borrow)
            throw new Error("Data peminjaman tidak ditemukan");
        if (borrow.returnDate)
            throw new Error("Buku sudah dikembalikan");
        // balikin stok
        for (const item of borrow.items) {
            await bookRepo.incrementStock(tx, item.bookId, item.quantity);
        }
        return borrowRepo.updateReturnDate(tx, borrowId);
    });
};
export const getMyBorrows = async (userId) => {
    return borrowRepo.findBorrowsByUserId(userId);
};
export const getAllBorrows = async ({ page, limit, }) => {
    const skip = (page - 1) * limit;
    const { items, total } = await borrowRepo.findAllBorrows({
        skip,
        take: limit,
    });
    return {
        total,
        items,
    };
};
export const getBorrowById = async (id) => {
    const data = await borrowRepo.findBorrowById(id);
    if (!data)
        throw new Error("Peminjaman tidak ditemukan");
    return data;
};
export const deleteBorrow = async (borrowId) => {
    return borrowRepo.deleteById(borrowId);
};
//# sourceMappingURL=borrowRecord.service.js.map