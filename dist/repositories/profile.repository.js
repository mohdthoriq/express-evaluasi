export class ProfileRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findUserById(userId) {
        return this.prisma.user.findUnique({
            where: { id: userId },
        });
    }
    findById(id) {
        return this.prisma.profile.findUnique({
            where: { id },
        });
    }
    create(data) {
        return this.prisma.profile.create({ data });
    }
    update(id, data) {
        return this.prisma.profile.update({
            where: { id },
            data,
        });
    }
    delete(id) {
        return this.prisma.profile.delete({
            where: { id },
        });
    }
}
//# sourceMappingURL=profile.repository.js.map