import type { Profile, Prisma } from "../generated"
import type { ProfileRepository } from "../repositories/profile.repository"

export class ProfileService {
  constructor(private profileRepo: ProfileRepository) {}

  async createProfile(data: {
    name: string
    gender: string
    address: string
    profile_picture_url?: string
    userId: number
  }): Promise<Profile> {
    const exist = await this.profileRepo.findUserById(data.userId)
    if (exist) throw new Error("Profile sudah ada")

    return this.profileRepo.create(data)
  }

  async getProfileById(id: number): Promise<Profile> {
    const profile = await this.profileRepo.findById(id)
    if (!profile) throw new Error("Profile tidak ditemukan")

    return profile
  }

  async updateProfile(
    id: number,
    data: Prisma.ProfileUpdateInput
  ): Promise<Profile> {
    await this.getProfileById(id)
    return this.profileRepo.update(id, data)
  }

  async deleteProfile(id: number): Promise<Profile> {
    await this.getProfileById(id)
    return this.profileRepo.delete(id)
  }
}
