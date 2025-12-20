import * as service from "../services/borrow_Item.service";
import { successResponse } from "../utils/response";
export const getAllItems = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const result = await service.getAllItems({ page, limit });
    const pagination = {
        page,
        limit,
        total: result.total,
        totalPages: Math.ceil(result.total / limit),
    };
    successResponse(res, "Data ditemukan", result.items, pagination);
};
export const getItemById = async (req, res) => {
    const id = Number(req.params.id);
    const data = await service.getItemById(id);
    successResponse(res, "Data ditemukan", data);
};
//# sourceMappingURL=borrow_Item.controller.js.map