import type { PrismaClient, User } from "../generated/index.js";
export interface IUserRepository {
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    create(data: {
        username: string;
        email: string;
        password: string;
        role?: string;
    }): Promise<User>;
}
export declare class UserRepository implements IUserRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    findByEmail(email: string): import("../generated/index.js").Prisma.Prisma__UserClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        username: string;
        email: string;
        password: string;
        role: string;
    } | null, null, import("../generated/runtime/client.js").DefaultArgs, import("../generated/index.js").Prisma.PrismaClientOptions>;
    findById(id: number): import("../generated/index.js").Prisma.Prisma__UserClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        username: string;
        email: string;
        password: string;
        role: string;
    } | null, null, import("../generated/runtime/client.js").DefaultArgs, import("../generated/index.js").Prisma.PrismaClientOptions>;
    create(data: {
        username: string;
        email: string;
        password: string;
        role?: string;
    }): import("../generated/index.js").Prisma.Prisma__UserClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        username: string;
        email: string;
        password: string;
        role: string;
    }, never, import("../generated/runtime/client.js").DefaultArgs, import("../generated/index.js").Prisma.PrismaClientOptions>;
}
//# sourceMappingURL=user.repository.d.ts.map
