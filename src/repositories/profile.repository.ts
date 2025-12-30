import type { Prisma, PrismaClient, Profile } from "../generated"

export interface IProfileRepository {
  findUserById(userId: number): Promise<any | null>
  findById(id: number): Promise<Profile | null>
  create(data: {
    name: string
    gender: string
    address: string
    profile_picture_url?: string
    userId: number
  }): Promise<Profile>
  update(id: number, data: Prisma.ProfileUpdateInput): Promise<Profile>
  delete(id: number): Promise<Profile>
}

export class ProfileRepository implements IProfileRepository {
  constructor(private prisma: PrismaClient) {}

  findUserById(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    })
  }

  findById(id: number) {
    return this.prisma.profile.findUnique({
      where: { id },
    })
  }

  create(data: {
    name: string
    gender: string
    address: string
    profile_picture_url?: string
    userId: number
  }) {
    return this.prisma.profile.create({ data })
  }

  update(id: number, data: Prisma.ProfileUpdateInput) {
    return this.prisma.profile.update({
      where: { id },
      data,
    })
  }

  delete(id: number) {
    return this.prisma.profile.delete({
      where: { id },
    })
  }
}
