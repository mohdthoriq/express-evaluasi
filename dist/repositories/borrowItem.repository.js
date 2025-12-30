export class BorrowItemRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(params) {
        const { skip, take } = params;
        const items = await this.prisma.borrowItem.findMany({
            skip,
            take,
            include: {
                book: true,
                borrowRecord: true,
            },
            orderBy: { id: "desc" },
        });
        const total = await this.prisma.borrowItem.count();
        return { items, total };
    }
    async findById(id) {
        return this.prisma.borrowItem.findUnique({
            where: { id },
            include: {
                book: true,
                borrowRecord: true,
            },
        });
    }
    async getStats() {
        return this.prisma.borrowItem.aggregate({
            _count: { id: true }
        });
    }
    async getBorrowItemByBookStats() {
        return this.prisma.borrowItem.groupBy({
            by: ["bookId"],
            _sum: { quantity: true }
        });
    }
    async getBorrowItemStats() {
        return this.prisma.borrowItem.aggregate({
            _sum: { quantity: true },
            _count: { id: true }
        });
    }
}
//# sourceMappingURL=borrowItem.repository.js.map