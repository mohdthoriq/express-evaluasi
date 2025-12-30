export class BorrowRecordRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    createBorrowRecord(tx, data) {
        return tx.borrowRecord.create({
            data: {
                userId: data.userId,
                items: {
                    create: data.items.map((item) => ({
                        bookId: item.bookId,
                        quantity: item.quantity,
                    })),
                },
            },
            include: {
                items: {
                    include: { book: true },
                },
            },
        });
    }
    findBorrowByIdTx(tx, borrowId) {
        return tx.borrowRecord.findUnique({
            where: { id: borrowId },
            include: { items: true },
        });
    }
    updateReturnDate(tx, borrowId) {
        return tx.borrowRecord.update({
            where: { id: borrowId },
            data: { returnDate: new Date() },
        });
    }
    findBorrowsByUserId(userId) {
        return this.prisma.borrowRecord.findMany({
            where: { userId },
            include: {
                items: { include: { book: true } },
            },
            orderBy: { createdAt: "desc" },
        });
    }
    async findAll({ skip, take }) {
        const items = await this.prisma.borrowRecord.findMany({
            skip,
            take,
            include: {
                user: true,
                items: {
                    include: { book: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });
        const total = await this.prisma.borrowRecord.count();
        return { items, total };
    }
    findById(id) {
        return this.prisma.borrowRecord.findUnique({
            where: { id },
            include: {
                user: true,
                items: { include: { book: true } },
            },
        });
    }
    deleteById(borrowId, tx) {
        const client = tx ?? this.prisma;
        return client.borrowRecord.delete({
            where: { id: borrowId },
        });
    }
    async getStats() {
        return this.prisma.borrowRecord.aggregate({
            _count: { id: true }, // total borrow record
        });
    }
    async getBorrowByUserStats() {
        return this.prisma.borrowRecord.groupBy({
            by: ["userId"],
            _count: { id: true }
        });
    }
    async getBorrowByReturnStatusStats() {
        return this.prisma.borrowRecord.groupBy({
            by: ["returnDate"], // null = belum dikembalikan
            _count: { id: true }
        });
    }
}
//# sourceMappingURL=borrowRecord.repository.js.map