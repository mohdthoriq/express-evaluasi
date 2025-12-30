import type { PrismaClient, BorrowItem } from "../generated";

export interface BorrowItemByBookStat {
  bookId: string
  _sum: {
    quantity: number | null
  }
}

export interface BorrowItemStat {
  _sum: {
    quantity: number | null
  }
  _count: {
    id: number
  }
}


export interface IBorrowItemRepository {
  findAll(params: {
    skip: number;
    take: number;
  }): Promise<{ items: BorrowItem[]; total: number }>;

  findById(id: number): Promise<BorrowItem | null>;

  getStats(): Promise<{ _count: { id: number } }>;

  getBorrowItemByBookStats(): Promise<BorrowItemByBookStat[]>;

  getBorrowItemStats(): Promise<BorrowItemStat>

}

export class BorrowItemRepository implements IBorrowItemRepository {
  constructor(private prisma: PrismaClient) { }

  async findAll(params: {
    skip: number;
    take: number;
  }) {
    const { skip, take } = params;

    const items = await this.prisma.borrowItem.findMany({
      skip,
      take,
      include: {
        book: true,
        borrowRecord: true,
      },
      orderBy: { id: "desc" },
    });

    const total = await this.prisma.borrowItem.count();

    return { items, total };
  }

  async findById(id: number) {
    return this.prisma.borrowItem.findUnique({
      where: { id },
      include: {
        book: true,
        borrowRecord: true,
      },
    });
  }

  async getStats() {
    return this.prisma.borrowItem.aggregate({
      _count: { id: true }
    })
  }

  async getBorrowItemByBookStats() {
    return this.prisma.borrowItem.groupBy({
      by: ["bookId"],
      _sum: { quantity: true }
    })
  }


  async getBorrowItemStats() {
    return this.prisma.borrowItem.aggregate({
      _sum: { quantity: true },
      _count: { id: true }
    })
  }

}
