import type { Prisma } from "../generated";
import type { BookRepository } from "../repositories/book.repository";

export interface IBookService {
  getAllBooks(params: {
    page: number;
    limit: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }): Promise<{ data: any; total: number; totalPages: number; currentPage: number }>
  getBookById(id: string): Promise<any>;
  createBook(data: {
    title: string;
    author: string;
    year: number;
    price: number;
    image: string;
    categoryId: string;
  }): Promise<any>;
  updateBook(id: string, data: Prisma.BookUpdateArgs["data"]): Promise<any>;
  deleteBook(id: string): Promise<any>;
  findByIdTx(tx: Prisma.TransactionClient, id: string): Promise<any>;
  decrementStockTx(tx: Prisma.TransactionClient, id: string, qty: number): Promise<any>;
  incrementStockTx(tx: Prisma.TransactionClient, id: string, qty: number): Promise<any>;
  exec(): Promise<any>;
}

export class BookService implements IBookService {
  constructor(private bookRepo: BookRepository) { }


  async getAllBooks(params: {
    page: number;
    limit: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }) {
    const { page, limit, search, sortBy, sortOrder } = params;

    const skip = (page - 1) * limit;

    const where: Prisma.BookWhereInput = {
      deletedAt: null,
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { author: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    const orderBy: Prisma.BookOrderByWithRelationInput = sortBy
      ? { [sortBy]: sortOrder || "desc" }
      : { createdAt: "desc" };

    const { books, total } = await this.bookRepo.findAll({
      skip,
      take: limit,
      where,
      orderBy,
    });

    return {
      data: books,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  async getBookById(id: string) {
    const book = await this.bookRepo.findById(id);

    if (!book) {
      throw new Error("Buku tidak ditemukan");
    }

    return book;
  }

  async createBook(data: {
    title: string;
    author: string;
    year: number;
    price: number;
    image: string;
    categoryId: string;
  }) {
    const { title, author, year, price, image, categoryId } = data;

    if (isNaN(price)) {
      throw new Error("Harga harus berupa angka");
    }

    if (isNaN(year) || year.toString().length !== 4) {
      throw new Error("Tahun harus 4 digit");
    }

    return this.bookRepo.create({
      title,
      author,
      year,
      price,
      image,
      categoryId,
    });
  }

  async updateBook(id: string, data: Prisma.BookUpdateArgs["data"]) {
    const existing = await this.bookRepo.findById(id);
    if (!existing) {
      throw new Error("Buku tidak ditemukan");
    }

    return this.bookRepo.update(id, data);
  }

  async deleteBook(id: string) {
    const existing = await this.bookRepo.findById(id);
    if (!existing) {
      throw new Error("Buku tidak ditemukan");
    }

    await this.bookRepo.softDelete(id);
  }

  async findByIdTx(tx: Prisma.TransactionClient, id: string) {
    return this.bookRepo.findByIdTx(tx, id);
  }


  async decrementStockTx(tx: Prisma.TransactionClient, id: string, qty: number) {
    return this.bookRepo.decrementStock(tx, id, qty);
  }

  async incrementStockTx(tx: Prisma.TransactionClient, id: string, qty: number) {
    return this.bookRepo.incrementStock(tx, id, qty);
  }

  async exec() {
    const stats = await this.bookRepo.getStats()
    const categoryStats = await this.bookRepo.getBooksByCategoryStats()

    return {
      overView: stats,
      byCategory: categoryStats
    }
  }
}
