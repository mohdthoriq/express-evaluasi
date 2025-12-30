export class CategoryService {
    categoryRepo;
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    async getAllCategories(params) {
        const { page, limit } = params;
        const skip = (page - 1) * limit;
        const { categories, total } = await this.categoryRepo.findAll({
            skip,
            take: limit,
        });
        return {
            data: categories,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
        };
    }
    async getCategoryById(id) {
        const category = await this.categoryRepo.findById(id);
        if (!category) {
            throw new Error("Kategori tidak ditemukan");
        }
        return category;
    }
    async createCategory(name) {
        if (!name) {
            throw new Error("Nama kategori tidak boleh kosong");
        }
        return this.categoryRepo.create(name);
    }
    async updateCategory(id, name) {
        if (!name) {
            throw new Error("Nama kategori tidak boleh kosong");
        }
        const exist = await this.categoryRepo.findById(id);
        if (!exist) {
            throw new Error("Kategori tidak ditemukan");
        }
        return this.categoryRepo.update(id, name);
    }
    async deleteCategory(id) {
        const exist = await this.categoryRepo.findById(id);
        if (!exist) {
            throw new Error("Kategori tidak ditemukan");
        }
        if (exist.books && exist.books.length > 0) {
            throw new Error("Kategori masih memiliki buku");
        }
        return this.categoryRepo.softDelete(id);
    }
    async execStats() {
        const data = await this.categoryRepo.getCategoryProductStats();
        return data.map(category => {
            const totalProducts = category.books.length;
            const totalStock = category.books.reduce((a, b) => a + b.stock, 0);
            const avgPrice = totalProducts === 0
                ? 0
                : category.books.reduce((a, b) => a + Number(b.price), 0) / totalProducts;
            return {
                id: category.id,
                name: category.name,
                totalProducts,
                totalStock,
                avgPrice
            };
        });
    }
}
//# sourceMappingURL=category.service.js.map