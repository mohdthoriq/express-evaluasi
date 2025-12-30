import type { CategoryRepository } from "../repositories/category.repository";

export interface ICategoryService {
  getAllCategories(params: {
    page: number;
    limit: number;
  }): Promise<{
    data: any;
    total: number;
    totalPages: number;
    currentPage: number;
  }>;

  getCategoryById(id: string): Promise<any>;

  createCategory(name: string): Promise<any>;

  updateCategory(id: string, name: string): Promise<any>;

  deleteCategory(id: string): Promise<any>;

  execStats(): Promise<any>;
}

export class CategoryService implements ICategoryService {
  constructor(private categoryRepo: CategoryRepository) {}

  async getAllCategories(params: { page: number; limit: number }) {
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

  async getCategoryById(id: string) {
    const category = await this.categoryRepo.findById(id);

    if (!category) {
      throw new Error("Kategori tidak ditemukan");
    }

    return category;
  }

  async createCategory(name: string) {
    if (!name) {
      throw new Error("Nama kategori tidak boleh kosong");
    }

    return this.categoryRepo.create(name);
  }

  async updateCategory(id: string, name: string) {
    if (!name) {
      throw new Error("Nama kategori tidak boleh kosong");
    }

    const exist = await this.categoryRepo.findById(id);
    if (!exist) {
      throw new Error("Kategori tidak ditemukan");
    }

    return this.categoryRepo.update(id, name);
  }

  async deleteCategory(id: string) {
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
    const data = await this.categoryRepo.getCategoryProductStats()

    return data.map(category => {
      const totalProducts = category.books.length
      const totalStock = category.books.reduce((a, b) => a + b.stock, 0)
      const avgPrice =
        totalProducts === 0
          ? 0
          : category.books.reduce((a, b) => a + Number(b.price), 0) / totalProducts

      return {
        id: category.id,
        name: category.name,
        totalProducts,
        totalStock,
        avgPrice
      }
    })
  }
}
