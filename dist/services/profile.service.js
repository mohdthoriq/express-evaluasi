export class ProfileService {
    profileRepo;
    constructor(profileRepo) {
        this.profileRepo = profileRepo;
    }
    async createProfile(data) {
        const exist = await this.profileRepo.findUserById(data.userId);
        if (exist)
            throw new Error("Profile sudah ada");
        return this.profileRepo.create(data);
    }
    async getProfileById(id) {
        const profile = await this.profileRepo.findById(id);
        if (!profile)
            throw new Error("Profile tidak ditemukan");
        return profile;
    }
    async updateProfile(id, data) {
        await this.getProfileById(id);
        return this.profileRepo.update(id, data);
    }
    async deleteProfile(id) {
        await this.getProfileById(id);
        return this.profileRepo.delete(id);
    }
}
//# sourceMappingURL=profile.service.js.map