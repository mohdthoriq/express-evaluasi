import type { Prisma } from "../generated";
import type { BookRepository } from "../repositories/book.repository";
export interface IBookService {
    getAllBooks(params: {
        page: number;
        limit: number;
        search?: string;
        sortBy?: string;
        sortOrder?: "asc" | "desc";
    }): Promise<{
        data: any;
        total: number;
        totalPages: number;
        currentPage: number;
    }>;
    getBookById(id: string): Promise<any>;
    createBook(data: {
        title: string;
        author: string;
        year: number;
        price: number;
        image: string;
        categoryId: string;
    }): Promise<any>;
    updateBook(id: string, data: Prisma.BookUpdateArgs["data"]): Promise<any>;
    deleteBook(id: string): Promise<any>;
    findByIdTx(tx: Prisma.TransactionClient, id: string): Promise<any>;
    decrementStockTx(tx: Prisma.TransactionClient, id: string, qty: number): Promise<any>;
    incrementStockTx(tx: Prisma.TransactionClient, id: string, qty: number): Promise<any>;
    exec(): Promise<any>;
}
export declare class BookService implements IBookService {
    private bookRepo;
    constructor(bookRepo: BookRepository);
    getAllBooks(params: {
        page: number;
        limit: number;
        search?: string;
        sortBy?: string;
        sortOrder?: "asc" | "desc";
    }): Promise<{
        data: ({
            category: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
            };
        } & {
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
        })[];
        total: number;
        totalPages: number;
        currentPage: number;
    }>;
    getBookById(id: string): Promise<{
        category: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
    } & {
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
    }>;
    createBook(data: {
        title: string;
        author: string;
        year: number;
        price: number;
        image: string;
        categoryId: string;
    }): Promise<{
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
    }>;
    updateBook(id: string, data: Prisma.BookUpdateArgs["data"]): Promise<{
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
    }>;
    deleteBook(id: string): Promise<void>;
    findByIdTx(tx: Prisma.TransactionClient, id: string): Promise<{
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
    } | null>;
    decrementStockTx(tx: Prisma.TransactionClient, id: string, qty: number): Promise<{
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
    }>;
    incrementStockTx(tx: Prisma.TransactionClient, id: string, qty: number): Promise<{
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
    }>;
    exec(): Promise<{
        overView: {
            totalBooks: number;
            totalCategories: number;
            totalAuthors: number;
        };
        byCategory: {
            category: string;
            totalBooks: number;
        }[];
    }>;
}
//# sourceMappingURL=book.service.d.ts.map