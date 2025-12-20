import type { Profile } from "../src/generated/prisma/client";
export declare const createProfile: (data: {
    name: string;
    gender: string;
    address: string;
    profile_picture_url?: string;
    userId: number;
}) => Promise<Profile>;
export declare const getProfileById: (id: number) => Promise<{
    id: number;
    name: string;
    userId: number;
    gender: string;
    address: string;
    profile_picture_url: string | null;
}>;
export declare const updateProfile: (id: number, data: Partial<Profile>) => Promise<{
    id: number;
    name: string;
    userId: number;
    gender: string;
    address: string;
    profile_picture_url: string | null;
}>;
export declare const deleteProfile: (id: number) => Promise<{
    id: number;
    name: string;
    userId: number;
    gender: string;
    address: string;
    profile_picture_url: string | null;
}>;
//# sourceMappingURL=profile.service.d.ts.map