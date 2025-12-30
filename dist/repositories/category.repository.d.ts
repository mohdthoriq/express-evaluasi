import type { Decimal } from "@prisma/client/runtime/client";
import { PrismaClient, type Category } from "../generated/client";
export interface ICategoryRepository {
    findAll(params: {
        skip: number;
        take: number;
    }): Promise<{
        categories: Category[];
        total: number;
    }>;
    findById(id: string): Promise<Category | null>;
    create(name: string): Promise<Category>;
    update(id: string, name: string): Promise<Category>;
    softDelete(id: string): Promise<Category>;
    getCategoryProductStats(): Promise<{
        id: string;
        name: string;
        books: {
            price: Decimal;
            stock: number;
        }[];
    }[]>;
}
export declare class CategoryRepository implements ICategoryRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    findAll(params: {
        skip: number;
        take: number;
    }): Promise<{
        categories: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        }[];
        total: number;
    }>;
    findById(id: string): Promise<({
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
    }) | null>;
    create(name: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    update(id: string, name: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    softDelete(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    getCategoryProductStats(): Promise<{
        id: string;
        name: string;
        books: {
            price: any;
            stock: number;
        }[];
    }[]>;
}
//# sourceMappingURL=category.repository.d.ts.map