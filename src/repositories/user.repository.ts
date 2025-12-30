import type { PrismaClient, User } from "../generated"

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>
  findById(id: number): Promise<User | null>
  create(data: {
    username: string
    email: string
    password: string
    role?: string
  }): Promise<User>
}

export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    })
  }

  findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    })
  }

  create(data: {
    username: string
    email: string
    password: string
    role?: string
  }) {
    return this.prisma.user.create({
      data,
    })
  }
}
