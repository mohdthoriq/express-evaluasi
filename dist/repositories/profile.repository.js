import { getPrisma } from "../prisma";
const prisma = getPrisma();
export async function findByUserId(userId) {
    return await prisma.user.findUnique({
        where: {
            id: userId
        }
    });
}
export async function findById(id) {
    return await prisma.user.findUnique({
        where: {
            id
        }
    });
}
export async function create(data) {
    return prisma.profile.create({
        data
    });
}
export async function update(id, data) {
    return prisma.profile.update({
        where: {
            id
        },
        data
    });
}
export async function remove(id) {
    return prisma.profile.delete({
        where: {
            id
        }
    });
}
//# sourceMappingURL=profile.repository.js.map