import type { PrismaClient, User } from "../generated/client";
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
    findByEmail(email: string): import("../generated/models").Prisma__UserClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        username: string;
        email: string;
        password: string;
        role: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findById(id: number): import("../generated/models").Prisma__UserClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        username: string;
        email: string;
        password: string;
        role: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    create(data: {
        username: string;
        email: string;
        password: string;
        role?: string;
    }): import("../generated/models").Prisma__UserClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        username: string;
        email: string;
        password: string;
        role: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
//# sourceMappingURL=user.repository.d.ts.map