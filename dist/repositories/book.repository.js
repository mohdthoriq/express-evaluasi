export class BookRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(params) {
        const { skip, take, where, orderBy } = params;
        const books = await this.prisma.book.findMany({
            skip,
            take,
            where,
            orderBy,
            include: { category: true },
        });
        const total = await this.prisma.book.count({ where });
        return { books, total };
    }
    async findById(id) {
        return this.prisma.book.findFirst({
            where: { id, deletedAt: null },
            include: { category: true },
        });
    }
    async create(data) {
        return this.prisma.book.create({ data });
    }
    async update(id, data) {
        return this.prisma.book.update({
            where: { id },
            data
        });
    }
    async softDelete(id) {
        return this.prisma.book.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    // ===== TRANSACTION METHODS =====
    findByIdTx(tx, id) {
        return tx.book.findUnique({
            where: { id },
        });
    }
    decrementStock(tx, id, qty) {
        return tx.book.update({
            where: { id },
            data: { stock: { decrement: qty } },
        });
    }
    incrementStock(tx, id, qty) {
        return tx.book.update({
            where: { id },
            data: { stock: { increment: qty } },
        });
    }
    async findComplex(params) {
        const { categoryName, maxPrice } = params;
        return this.prisma.book.findMany({
            where: {
                deletedAt: null,
                OR: [
                    {
                        AND: [
                            { category: { name: categoryName } },
                            { price: { lte: maxPrice } }
                        ]
                    },
                    {
                        category: { name: "Aksesoris" }
                    }
                ]
            },
            include: { category: true }
        });
    }
    async getStats() {
        const [totalBooks, totalCategories, authors] = await Promise.all([
            this.prisma.book.count({
                where: { deletedAt: null }
            }),
            this.prisma.category.count(),
            this.prisma.book.findMany({
                where: { deletedAt: null },
                select: { author: true },
                distinct: ["author"]
            })
        ]);
        return {
            totalBooks,
            totalCategories,
            totalAuthors: authors.length
        };
    }
    async getBooksByCategoryStats() {
        const data = await this.prisma.category.findMany({
            select: {
                name: true,
                _count: {
                    select: {
                        books: {
                            where: { deletedAt: null }
                        }
                    }
                }
            }
        });
        return data.map(item => ({
            category: item.name,
            totalBooks: item._count.books
        }));
    }
}
//# sourceMappingURL=book.repository.js.map