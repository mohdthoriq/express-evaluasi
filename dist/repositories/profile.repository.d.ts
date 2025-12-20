import type { Prisma } from "../src/generated/prisma/client";
export declare function findByUserId(userId: number): Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    username: string;
    email: string;
    password: string;
    role: string;
} | null>;
export declare function findById(id: number): Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    username: string;
    email: string;
    password: string;
    role: string;
} | null>;
export declare function create(data: {
    name: string;
    gender: string;
    address: string;
    profile_picture_url?: string;
    userId: number;
}): Promise<{
    id: number;
    name: string;
    userId: number;
    gender: string;
    address: string;
    profile_picture_url: string | null;
}>;
export declare function update(id: number, data: Prisma.ProfileUpdateInput): Promise<{
    id: number;
    name: string;
    userId: number;
    gender: string;
    address: string;
    profile_picture_url: string | null;
}>;
export declare function remove(id: number): Promise<{
    id: number;
    name: string;
    userId: number;
    gender: string;
    address: string;
    profile_picture_url: string | null;
}>;
//# sourceMappingURL=profile.repository.d.ts.map