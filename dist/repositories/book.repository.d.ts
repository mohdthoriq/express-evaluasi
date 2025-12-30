import type { Book, Prisma, PrismaClient } from "../generated/client";
export interface IBookRepository {
    findAll(params: {
        skip: number;
        take: number;
        where: Prisma.BookWhereInput;
        orderBy: Prisma.BookOrderByWithRelationInput;
    }): Promise<{
        books: Book[];
        total: number;
    }>;
    findById(id: string): Promise<Book | null>;
    create(data: {
        title: string;
        author: string;
        year: number;
        price: number;
        image: string;
        categoryId: string;
    }): Promise<Book>;
    update(id: string, data: Prisma.BookUpdateInput): Promise<Book>;
    softDelete(id: string): Promise<Book>;
    findByIdTx(tx: Prisma.TransactionClient, id: string): Promise<Book | null>;
    decrementStock(tx: Prisma.TransactionClient, id: string, qty: number): Promise<Book>;
    incrementStock(tx: Prisma.TransactionClient, id: string, qty: number): Promise<Book>;
    findComplex(params: {
        categoryName: string;
        maxPrice: number;
    }): Promise<Book[]>;
    getStats(): Promise<{
        totalBooks: number;
        totalCategories: number;
        totalAuthors: number;
    }>;
    getBooksByCategoryStats(): Promise<{
        category: string;
        totalBooks: number;
    }[]>;
}
export declare class BookRepository implements IBookRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    findAll(params: {
        skip: number;
        take: number;
        where: Prisma.BookWhereInput;
        orderBy: Prisma.BookOrderByWithRelationInput;
    }): Promise<{
        books: ({
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
    }>;
    findById(id: string): Promise<({
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
    }) | null>;
    create(data: {
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
    update(id: string, data: Prisma.BookUpdateInput): Promise<{
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
    softDelete(id: string): Promise<{
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
    findByIdTx(tx: Prisma.TransactionClient, id: string): Prisma.Prisma__BookClient<{
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
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: undefined;
    }>;
    decrementStock(tx: Prisma.TransactionClient, id: string, qty: number): Prisma.Prisma__BookClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: undefined;
    }>;
    incrementStock(tx: Prisma.TransactionClient, id: string, qty: number): Prisma.Prisma__BookClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: undefined;
    }>;
    findComplex(params: {
        categoryName: string;
        maxPrice: number;
    }): Promise<({
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
    })[]>;
    getStats(): Promise<{
        totalBooks: number;
        totalCategories: number;
        totalAuthors: number;
    }>;
    getBooksByCategoryStats(): Promise<{
        category: string;
        totalBooks: number;
    }[]>;
}
//# sourceMappingURL=book.repository.d.ts.map