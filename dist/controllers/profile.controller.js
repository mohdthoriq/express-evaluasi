import { successResponse } from "../utils/response.js";
export class ProfileController {
    profileService;
    constructor(profileService) {
        this.profileService = profileService;
    }
    create = async (req, res) => {
        const file = req.file;
        if (!file)
            throw new Error("image is required");
        const { name, gender, address } = req.body;
        const imageURL = `/public/uploads/${file.filename}`;
        const profile = await this.profileService.createProfile({
            name: String(name),
            gender: String(gender),
            address: String(address),
            profile_picture_url: imageURL,
            userId: Number(req.user?.id),
        });
        successResponse(res, "Profile created successfully", profile);
    };
    getById = async (req, res) => {
        const profile = await this.profileService.getProfileById(Number(req.params.id));
        successResponse(res, "Profile retrieved successfully", profile);
    };
    update = async (req, res) => {
        const profile = await this.profileService.updateProfile(Number(req.params.id), req.body);
        successResponse(res, "Profile updated successfully", profile);
    };
    remove = async (req, res) => {
        const profile = await this.profileService.deleteProfile(Number(req.params.id));
        successResponse(res, "Profile deleted successfully", profile);
    };
}
//# sourceMappingURL=profile.controller.js.map
