import { getPrisma } from "../prisma";
const prisma = getPrisma();
export const findByEmail = async (email) => {
    return prisma.user.findUnique({
        where: { email }
    });
};
export const findById = async (id) => {
    return prisma.user.findUnique({
        where: { id }
    });
};
export const create = async (data) => {
    return prisma.user.create({
        data
    });
};
//# sourceMappingURL=user.repository.js.map