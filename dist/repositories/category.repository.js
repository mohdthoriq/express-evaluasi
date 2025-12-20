import { getPrisma } from "../prisma";
const prisma = getPrisma();
export const findAll = async ({ skip, take, }) => {
    const categories = await prisma.category.findMany({
        skip,
        take,
        orderBy: { createdAt: "desc" }
    });
    const total = await prisma.category.count();
    return { categories, total };
};
export async function findById(id) {
    return prisma.category.findFirst({
        where: { id, deletedAt: null },
        include: { books: {
                where: { deletedAt: null }
            } }
    });
}
export async function create(name) {
    return prisma.category.create({
        data: { name }
    });
}
export async function update(id, name) {
    return prisma.category.update({
        where: { id },
        data: { name }
    });
}
export async function softDelete(id) {
    return prisma.category.update({
        where: { id },
        data: { deletedAt: new Date() }
    });
}
//# sourceMappingURL=category.repository.js.map