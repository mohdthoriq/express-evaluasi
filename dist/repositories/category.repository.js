import { PrismaClient } from "../generated/index.js";
export class CategoryRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(params) {
        const { skip, take } = params;
        const categories = await this.prisma.category.findMany({
            skip,
            take,
            orderBy: { createdAt: "desc" },
        });
        const total = await this.prisma.category.count();
        return { categories, total };
    }
    async findById(id) {
        return this.prisma.category.findFirst({
            where: { id, deletedAt: null },
            include: {
                books: {
                    where: { deletedAt: null },
                },
            },
        });
    }
    async create(name) {
        return this.prisma.category.create({
            data: { name },
        });
    }
    async update(id, name) {
        return this.prisma.category.update({
            where: { id },
            data: { name },
        });
    }
    async softDelete(id) {
        return this.prisma.category.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    async getCategoryProductStats() {
        return this.prisma.category.findMany({
            where: {
                deletedAt: null
            },
            select: {
                id: true,
                name: true,
                books: {
                    where: {
                        deletedAt: null
                    },
                    select: {
                        price: true,
                        stock: true
                    }
                }
            }
        });
    }
}
//# sourceMappingURL=category.repository.js.map
