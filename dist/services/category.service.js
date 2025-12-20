import * as categoryRepo from "../repositories/category.repository";
export const getAllCategories = async ({ page, limit, }) => {
    const skip = (page - 1) * limit;
    const { categories, total } = await categoryRepo.findAll({
        skip,
        take: limit
    });
    return {
        total,
        categories,
    };
};
export const getCategoryById = async (id) => {
    const category = await categoryRepo.findById(id);
    if (!category) {
        throw new Error("Kategori tidak ditemukan");
    }
    return category;
};
export const createCategory = async (name) => {
    if (!name) {
        throw new Error("Nama kategori tidak boleh kosong");
    }
    return categoryRepo.create(name);
};
export const updateCategory = async (id, name) => {
    if (!name) {
        throw new Error("Nama kategori tidak boleh kosong");
    }
    const exist = await categoryRepo.findById(id);
    if (!exist) {
        throw new Error("Kategori tidak ditemukan");
    }
    return categoryRepo.update(id, name);
};
export const deleteCategory = async (id) => {
    const exist = await categoryRepo.findById(id);
    if (!exist) {
        throw new Error("Kategori tidak ditemukan");
    }
    if (exist.books && exist.books.length > 0) {
        throw new Error("Kategori masih memiliki buku");
    }
    return categoryRepo.softDelete(id);
};
//# sourceMappingURL=category.service.js.map