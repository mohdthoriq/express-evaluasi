import type { Decimal } from "@prisma/client/runtime/client";
import { PrismaClient, type Category } from "../generated";

export interface ICategoryRepository {
  findAll(params: {
    skip: number;
    take: number;
  }): Promise<{ categories: Category[]; total: number }>;

  findById(id: string): Promise<Category | null>;

  create(name: string): Promise<Category>;

  update(id: string, name: string): Promise<Category>;

  softDelete(id: string): Promise<Category>;

   getCategoryProductStats(): Promise<{
    id: string;
    name: string;
    books: {
      price: Decimal;
      stock: number;
    }[];
  }[]>;
}

export class CategoryRepository implements ICategoryRepository{
   constructor(private prisma: PrismaClient) {}

  async findAll(params: {
    skip: number;
    take: number;
  }) {
    const { skip, take } = params;

    const categories = await this.prisma.category.findMany({
      skip,
      take,
      orderBy: { createdAt: "desc" },
    });

    const total = await this.prisma.category.count();

    return { categories, total };
  }

  async findById(id: string) {
    return this.prisma.category.findFirst({
      where: { id, deletedAt: null },
      include: {
        books: {
          where: { deletedAt: null },
        },
      },
    });
  }

  async create(name: string) {
    return this.prisma.category.create({
      data: { name },
    });
  }

  async update(id: string, name: string) {
    return this.prisma.category.update({
      where: { id },
      data: { name },
    });
  }

  async softDelete(id: string) {
    return this.prisma.category.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

    async getCategoryProductStats(): Promise<{
    id: string
    name: string
    books: {
      price: any
      stock: number
    }[]
  }[]> {
    return this.prisma.category.findMany({
      where: {
        deletedAt: null
      },
      select: {
        id: true,
        name: true,
        books: {
          where: {
            deletedAt: null
          },
          select: {
            price: true,
            stock: true
          }
        }
      }
    })
  }
}
