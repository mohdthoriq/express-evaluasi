import { getPrisma } from "../prisma";
const prisma = getPrisma();
export const findAll = async ({ skip, take, where, orderBy, }) => {
    const books = await prisma.book.findMany({
        skip,
        take,
        where,
        orderBy,
        include: { category: true },
    });
    const total = await prisma.book.count({ where });
    return { books, total };
};
export async function findById(id) {
    return prisma.book.findFirst({
        where: { id, deletedAt: null },
        include: { category: true }
    });
}
export async function search(filters) {
    return prisma.book.findMany({
        where: filters,
        include: { category: true }
    });
}
export async function create(data) {
    return prisma.book.create({
        data
    });
}
export async function update(id, data) {
    return prisma.book.update({
        where: { id },
        data
    });
}
export async function softDelete(id) {
    return prisma.book.update({
        where: { id },
        data: { deletedAt: new Date() }
    });
}
export const findByIdTx = (tx, id) => {
    return tx.book.findUnique({ where: { id } });
};
export const decrementStock = (tx, id, qty) => {
    return tx.book.update({
        where: { id },
        data: { stock: { decrement: qty } }
    });
};
export const incrementStock = (tx, id, qty) => {
    return tx.book.update({
        where: { id },
        data: { stock: { increment: qty } }
    });
};
//# sourceMappingURL=book.repository.js.map