import * as borrowItemRepo from "../repositories/borrowItem.repository";
export const getAllItems = async ({ page, limit, }) => {
    const skip = (page - 1) * limit;
    const { items, total } = await borrowItemRepo.findAll({
        skip,
        take: limit,
    });
    return {
        total,
        items,
    };
};
export const getItemById = async (id) => {
    const item = await borrowItemRepo.findById(id);
    if (!item)
        throw new Error("Borrow item tidak ditemukan");
    return item;
};
//# sourceMappingURL=borrow_Item.service.js.map