import type { Prisma, PrismaClient, Profile } from "../generated/client";
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
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findById(id: number): Prisma.Prisma__ProfileClient<{
        name: string;
        id: number;
        userId: number;
        gender: string;
        address: string;
        profile_picture_url: string | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    update(id: number, data: Prisma.ProfileUpdateInput): Prisma.Prisma__ProfileClient<{
        name: string;
        id: number;
        userId: number;
        gender: string;
        address: string;
        profile_picture_url: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    delete(id: number): Prisma.Prisma__ProfileClient<{
        name: string;
        id: number;
        userId: number;
        gender: string;
        address: string;
        profile_picture_url: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
}
//# sourceMappingURL=profile.repository.d.ts.map