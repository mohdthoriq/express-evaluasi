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
export declare class CategoryService implements ICategoryService {
    private categoryRepo;
    constructor(categoryRepo: CategoryRepository);
    getAllCategories(params: {
        page: number;
        limit: number;
    }): Promise<{
        data: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        }[];
        total: number;
        totalPages: number;
        currentPage: number;
    }>;
    getCategoryById(id: string): Promise<{
        books: {
            id: string;
            title: string;
            author: string;
            year: number;
            price: number;
            categoryId: string;
            image: string;
            stock: number;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    createCategory(name: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    updateCategory(id: string, name: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    deleteCategory(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    execStats(): Promise<{
        id: string;
        name: string;
        totalProducts: number;
        totalStock: number;
        avgPrice: number;
    }[]>;
}
//# sourceMappingURL=category.service.d.ts.map