import { getPrisma } from "../prisma";
const prisma = getPrisma();
export const findAll = async ({ skip, take, }) => {
    const items = await prisma.borrowItem.findMany({
        skip,
        take,
        include: {
            book: true,
            borrowRecord: true,
        },
        orderBy: { id: "desc" },
    });
    const total = await prisma.borrowItem.count();
    return { items, total };
};
export const findById = async (id) => {
    return prisma.borrowItem.findUnique({
        where: { id },
        include: {
            book: true,
            borrowRecord: true,
        },
    });
};
//# sourceMappingURL=borrowItem.repository.js.map