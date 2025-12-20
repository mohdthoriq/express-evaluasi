import { getPrisma } from "../prisma";
const prisma = getPrisma();
export const createBorrowRecord = (tx, data) => {
    return tx.borrowRecord.create({
        data: {
            userId: data.userId,
            items: {
                create: data.items.map(item => ({
                    bookId: item.bookId,
                    quantity: item.quantity
                }))
            }
        },
        include: {
            items: {
                include: { book: true }
            }
        }
    });
};
export const findBorrowByIdTx = (tx, borrowId) => {
    return tx.borrowRecord.findUnique({
        where: { id: borrowId },
        include: { items: true }
    });
};
export const updateReturnDate = (tx, borrowId) => {
    return tx.borrowRecord.update({
        where: { id: borrowId },
        data: { returnDate: new Date() }
    });
};
export const findBorrowsByUserId = (userId) => {
    return prisma.borrowRecord.findMany({
        where: { userId },
        include: {
            items: { include: { book: true } }
        },
        orderBy: { createdAt: "desc" }
    });
};
export const findAllBorrows = async ({ skip, take, }) => {
    const items = await prisma.borrowRecord.findMany({
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
    const total = await prisma.borrowRecord.count();
    return { items, total };
};
export const findBorrowById = (id) => {
    return prisma.borrowRecord.findUnique({
        where: { id },
        include: {
            user: true,
            items: { include: { book: true } }
        }
    });
};
export const deleteById = async (borrowId, tx = prisma) => {
    return tx.borrowRecord.delete({
        where: { id: borrowId }
    });
};
//# sourceMappingURL=borrowRecord.repository.js.map