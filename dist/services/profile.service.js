import { getPrisma } from "../prisma";
import * as profileRepo from "../repositories/profile.repository";
const prisma = getPrisma();
export const createProfile = async (data) => {
    const exist = await profileRepo.findByUserId(data.userId);
    if (exist)
        throw new Error("Profile sudah ada");
    return profileRepo.create(data);
};
export const getProfileById = async (id) => {
    const profile = await prisma.profile.findUnique({
        where: {
            id
        }
    });
    if (!profile)
        throw new Error("Profile tidak ditemukan");
    return profile;
};
export const updateProfile = async (id, data) => {
    return profileRepo.update(id, data);
};
export const deleteProfile = async (id) => {
    await getProfileById(id);
    return profileRepo.remove(id);
};
//# sourceMappingURL=profile.service.js.map