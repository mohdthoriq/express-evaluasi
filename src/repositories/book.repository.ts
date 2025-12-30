import type { Book, Prisma, PrismaClient } from "../generated";

export interface IBookRepository {
  findAll(params: {
    skip: number;
    take: number;
    where: Prisma.BookWhereInput;
    orderBy: Prisma.BookOrderByWithRelationInput;
  }): Promise<{ books: Book[]; total: number }>;

  findById(id: string): Promise<Book | null>;

  create(data: {
    title: string;
    author: string;
    year: number;
    price: number;
    image: string;
    categoryId: string;
  }): Promise<Book>;

  update(id: string, data: Prisma.BookUpdateInput): Promise<Book>;

  softDelete(id: string): Promise<Book>;

  findByIdTx(tx: Prisma.TransactionClient, id: string): Promise<Book | null>;

  decrementStock(tx: Prisma.TransactionClient, id: string, qty: number): Promise<Book>;

  incrementStock(tx: Prisma.TransactionClient, id: string, qty: number): Promise<Book>;

  findComplex(params: {
    categoryName: string
    maxPrice: number
  }): Promise<Book[]>;

  getStats(): Promise<{ totalBooks: number; totalCategories: number; totalAuthors: number }>;

  getBooksByCategoryStats(): Promise<{ category: string; totalBooks: number }[]>
}

export class BookRepository implements IBookRepository {
  constructor(private prisma: PrismaClient) { }

  async findAll(params: {
    skip: number;
    take: number;
    where: Prisma.BookWhereInput;
    orderBy: Prisma.BookOrderByWithRelationInput;
  }) {
    const { skip, take, where, orderBy } = params;

    const books = await this.prisma.book.findMany({
      skip,
      take,
      where,
      orderBy,
      include: { category: true },
    });

    const total = await this.prisma.book.count({ where });

    return { books, total };
  }

  async findById(id: string) {
    return this.prisma.book.findFirst({
      where: { id, deletedAt: null },
      include: { category: true },
    });
  }

  async create(data: {
    title: string;
    author: string;
    year: number;
    price: number;
    image: string;
    categoryId: string;
  }) {
    return this.prisma.book.create({ data });
  }

  async update(id: string, data: Prisma.BookUpdateInput) {
    return this.prisma.book.update({
      where: { id },
      data
    });
  }

  async softDelete(id: string) {
    return this.prisma.book.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  // ===== TRANSACTION METHODS =====

  findByIdTx(tx: Prisma.TransactionClient, id: string) {
    return tx.book.findUnique({
      where: { id },
    });
  }

  decrementStock(tx: Prisma.TransactionClient, id: string, qty: number) {
    return tx.book.update({
      where: { id },
      data: { stock: { decrement: qty } },
    });
  }

  incrementStock(tx: Prisma.TransactionClient, id: string, qty: number) {
    return tx.book.update({
      where: { id },
      data: { stock: { increment: qty } },
    });
  }

  async findComplex(params: {
    categoryName: string
    maxPrice: number
  }) {
    const { categoryName, maxPrice } = params

    return this.prisma.book.findMany({
      where: {
        deletedAt: null,
        OR: [
          {
            AND: [
              { category: { name: categoryName } },
              { price: { lte: maxPrice } }
            ]
          },
          {
            category: { name: "Aksesoris" }
          }
        ]
      },
      include: { category: true }
    })
  }

  async getStats() {
    const [totalBooks, totalCategories, authors] = await Promise.all([
      this.prisma.book.count({
        where: { deletedAt: null }
      }),

      this.prisma.category.count(),

      this.prisma.book.findMany({
        where: { deletedAt: null },
        select: { author: true },
        distinct: ["author"]
      })
    ])

    return {
      totalBooks,
      totalCategories,
      totalAuthors: authors.length
    }
  }

  async getBooksByCategoryStats() {
    const data = await this.prisma.category.findMany({
      select: {
        name: true,
        _count: {
          select: {
            books: {
              where: { deletedAt: null }
            }
          }
        }
      }
    })

    return data.map(item => ({
      category: item.name,
      totalBooks: item._count.books
    }))
  }
}
