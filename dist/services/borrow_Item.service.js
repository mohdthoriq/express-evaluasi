export class BorrowItemService {
    borrowItemRepo;
    constructor(borrowItemRepo) {
        this.borrowItemRepo = borrowItemRepo;
    }
    async getAllItems(params) {
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
    async getItemById(id) {
        const item = await this.borrowItemRepo.findById(id);
        if (!item) {
            throw new Error("Borrow item tidak ditemukan");
        }
        return item;
    }
    async exec() {
        const overview = await this.borrowItemRepo.getBorrowItemStats();
        const byBook = await this.borrowItemRepo.getBorrowItemByBookStats();
        return {
            overview: {
                totalItems: overview._count.id,
                totalQuantity: overview._sum.quantity ?? 0
            },
            byBook: byBook.map(item => ({
                bookId: item.bookId,
                totalQuantity: item._sum.quantity ?? 0
            }))
        };
    }
}
//# sourceMappingURL=borrow_Item.service.js.map