import type { BorrowItem } from "../generated/client";
import type { BorrowItemRepository } from "../repositories/borrowItem.repository";

export interface IBorrowItemService {
  getAllItems(params: {
    page: number;
    limit: number;
  }): Promise<{
    total: number;
    items: BorrowItem[];
  }>;

  getItemById(id: number): Promise<BorrowItem>;

  exec(): Promise<any>;
}

export class BorrowItemService implements IBorrowItemService {
  constructor(private borrowItemRepo: BorrowItemRepository) {}

  async getAllItems(params: {
    page: number;
    limit: number;
  }) {
    const { page, limit } = params;

    const skip = (page - 1) * limit;

    const { items, total } = await this.borrowItemRepo.findAll({
      skip,
      take: limit,
    });

    return {
      total,
      items,
    };
  }

  async getItemById(id: number) {
    const item = await this.borrowItemRepo.findById(id);

    if (!item) {
      throw new Error("Borrow item tidak ditemukan");
    }

    return item;
  }

   async exec() {
    const overview = await this.borrowItemRepo.getBorrowItemStats()
    const byBook = await this.borrowItemRepo.getBorrowItemByBookStats()

    return {
      overview: {
        totalItems: overview._count.id,
        totalQuantity: overview._sum.quantity ?? 0
      },
      byBook: byBook.map(item => ({
        bookId: item.bookId,
        totalQuantity: item._sum.quantity ?? 0
      }))
    }
  }
}
