import type { Profile, Prisma } from "../generated/index.js";
import type { ProfileRepository } from "../repositories/profile.repository.js";
export declare class ProfileService {
    private profileRepo;
    constructor(profileRepo: ProfileRepository);
    createProfile(data: {
        name: string;
        gender: string;
        address: string;
        profile_picture_url?: string;
        userId: number;
    }): Promise<Profile>;
    getProfileById(id: number): Promise<Profile>;
    updateProfile(id: number, data: Prisma.ProfileUpdateInput): Promise<Profile>;
    deleteProfile(id: number): Promise<Profile>;
}
//# sourceMappingURL=profile.service.d.ts.map
