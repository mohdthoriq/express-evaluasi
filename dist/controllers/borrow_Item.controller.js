import { successResponse } from "../utils/response.js";
export class BorrowItemController {
    borrowItemService;
    constructor(borrowItemService) {
        this.borrowItemService = borrowItemService;
    }
    getAllItems = async (req, res) => {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const result = await this.borrowItemService.getAllItems({
            page,
            limit,
        });
        const pagination = {
            page,
            limit,
            total: result.total,
            totalPages: Math.ceil(result.total / limit),
        };
        successResponse(res, "Data ditemukan", result.items, pagination);
    };
    getItemById = async (req, res) => {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            throw new Error("ID tidak valid");
        }
        const data = await this.borrowItemService.getItemById(id);
        successResponse(res, "Data ditemukan", data);
    };
    getStats = async (req, res) => {
        const stats = await this.borrowItemService.exec();
        successResponse(res, "Borrow item stats retrieved successfully", stats);
    };
}
//# sourceMappingURL=borrow_Item.controller.js.map
