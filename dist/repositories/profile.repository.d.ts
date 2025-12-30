import type { Prisma, PrismaClient, Profile } from "../generated/index.js";
export interface IProfileRepository {
    findUserById(userId: number): Promise<any | null>;
    findById(id: number): Promise<Profile | null>;
    create(data: {
        name: string;
        gender: string;
        address: string;
        profile_picture_url?: string;
        userId: number;
    }): Promise<Profile>;
    update(id: number, data: Prisma.ProfileUpdateInput): Promise<Profile>;
    delete(id: number): Promise<Profile>;
}
export declare class ProfileRepository implements IProfileRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    findUserById(userId: number): Prisma.Prisma__UserClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        username: string;
        email: string;
        password: string;
        role: string;
    } | null, null, import("../generated/runtime/client.js").DefaultArgs, Prisma.PrismaClientOptions>;
    findById(id: number): Prisma.Prisma__ProfileClient<{
        name: string;
        id: number;
        userId: number;
        gender: string;
        address: string;
        profile_picture_url: string | null;
    } | null, null, import("../generated/runtime/client.js").DefaultArgs, Prisma.PrismaClientOptions>;
    create(data: {
        name: string;
        gender: string;
        address: string;
        profile_picture_url?: string;
        userId: number;
    }): Prisma.Prisma__ProfileClient<{
        name: string;
        id: number;
        userId: number;
        gender: string;
        address: string;
        profile_picture_url: string | null;
    }, never, import("../generated/runtime/client.js").DefaultArgs, Prisma.PrismaClientOptions>;
    update(id: number, data: Prisma.ProfileUpdateInput): Prisma.Prisma__ProfileClient<{
        name: string;
        id: number;
        userId: number;
        gender: string;
        address: string;
        profile_picture_url: string | null;
    }, never, import("../generated/runtime/client.js").DefaultArgs, Prisma.PrismaClientOptions>;
    delete(id: number): Prisma.Prisma__ProfileClient<{
        name: string;
        id: number;
        userId: number;
        gender: string;
        address: string;
        profile_picture_url: string | null;
    }, never, import("../generated/runtime/client.js").DefaultArgs, Prisma.PrismaClientOptions>;
}
//# sourceMappingURL=profile.repository.d.ts.map
