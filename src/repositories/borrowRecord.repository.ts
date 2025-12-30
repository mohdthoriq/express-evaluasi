import type { Prisma, PrismaClient, BorrowRecord } from "../generated";

export interface IBorrowRecordRepository {
  createBorrowRecord(
    tx: Prisma.TransactionClient,
    data: {
      userId: number;
      items: { bookId: string; quantity: number }[];
    }
  ): Promise<BorrowRecord>;

  findBorrowByIdTx(
    tx: Prisma.TransactionClient,
    borrowId: number
  ): Promise<BorrowRecord | null>;

  updateReturnDate(
    tx: Prisma.TransactionClient,
    borrowId: number
  ): Promise<BorrowRecord>;

  findBorrowsByUserId(userId: number): Promise<BorrowRecord[]>;

  findAll(params: {
    skip: number;
    take: number;
  }): Promise<{ items: BorrowRecord[]; total: number }>;

  findById(id: number): Promise<BorrowRecord | null>;

  deleteById(
    borrowId: number,
    tx?: Prisma.TransactionClient
  ): Promise<BorrowRecord>;

  getStats(): Promise<{ _count: { id: number } }>;

  getBorrowByUserStats(): Promise<{ userId: number; _count: { id: number } }[]>;

  getBorrowByReturnStatusStats(): Promise<{
    returnDate: Date | null;
    _count: { id: number };
  }[]>;
}

export class BorrowRecordRepository implements IBorrowRecordRepository {
  constructor(private prisma: PrismaClient) {}

  createBorrowRecord(
    tx: Prisma.TransactionClient,
    data: {
      userId: number;
      items: { bookId: string; quantity: number }[];
    }
  ) {
    return tx.borrowRecord.create({
      data: {
        userId: data.userId,
        items: {
          create: data.items.map((item) => ({
            bookId: item.bookId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: {
          include: { book: true },
        },
      },
    });
  }

  findBorrowByIdTx(tx: Prisma.TransactionClient, borrowId: number) {
    return tx.borrowRecord.findUnique({
      where: { id: borrowId },
      include: { items: true },
    });
  }

  updateReturnDate(tx: Prisma.TransactionClient, borrowId: number) {
    return tx.borrowRecord.update({
      where: { id: borrowId },
      data: { returnDate: new Date() },
    });
  }

  findBorrowsByUserId(userId: number) {
    return this.prisma.borrowRecord.findMany({
      where: { userId },
      include: {
        items: { include: { book: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findAll({ skip, take }: { skip: number; take: number }) {
    const items = await this.prisma.borrowRecord.findMany({
      skip,
      take,
      include: {
        user: true,
        items: {
          include: { book: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const total = await this.prisma.borrowRecord.count();

    return { items, total };
  }

  findById(id: number) {
    return this.prisma.borrowRecord.findUnique({
      where: { id },
      include: {
        user: true,
        items: { include: { book: true } },
      },
    });
  }

  deleteById(
    borrowId: number,
    tx?: Prisma.TransactionClient
  ) {
    const client = tx ?? this.prisma;

    return client.borrowRecord.delete({
      where: { id: borrowId },
    });
  }

   async getStats() {
    return this.prisma.borrowRecord.aggregate({
      _count: { id: true },          // total borrow record
    })
  }

  async getBorrowByUserStats() {
    return this.prisma.borrowRecord.groupBy({
      by: ["userId"],
      _count: { id: true }
    })
  }

  async getBorrowByReturnStatusStats() {
    return this.prisma.borrowRecord.groupBy({
      by: ["returnDate"],   // null = belum dikembalikan
      _count: { id: true }
    })
  }
}
