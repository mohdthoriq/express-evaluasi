import type { PrismaClient, BorrowItem } from "../generated/client";
export interface BorrowItemByBookStat {
    bookId: string;
    _sum: {
        quantity: number | null;
    };
}
export interface BorrowItemStat {
    _sum: {
        quantity: number | null;
    };
    _count: {
        id: number;
    };
}
export interface IBorrowItemRepository {
    findAll(params: {
        skip: number;
        take: number;
    }): Promise<{
        items: BorrowItem[];
        total: number;
    }>;
    findById(id: number): Promise<BorrowItem | null>;
    getStats(): Promise<{
        _count: {
            id: number;
        };
    }>;
    getBorrowItemByBookStats(): Promise<BorrowItemByBookStat[]>;
    getBorrowItemStats(): Promise<BorrowItemStat>;
}
export declare class BorrowItemRepository implements IBorrowItemRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    findAll(params: {
        skip: number;
        take: number;
    }): Promise<{
        items: ({
            book: {
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
            };
            borrowRecord: {
                id: number;
                createdAt: Date;
                userId: number;
                borrowDate: Date;
                returnDate: Date | null;
                status: string;
            };
        } & {
            id: number;
            quantity: number;
            borrowRecordId: number;
            bookId: string;
        })[];
        total: number;
    }>;
    findById(id: number): Promise<({
        book: {
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
        };
        borrowRecord: {
            id: number;
            createdAt: Date;
            userId: number;
            borrowDate: Date;
            returnDate: Date | null;
            status: string;
        };
    } & {
        id: number;
        quantity: number;
        borrowRecordId: number;
        bookId: string;
    }) | null>;
    getStats(): Promise<import("../generated/models").GetBorrowItemAggregateType<{
        _count: {
            id: true;
        };
    }>>;
    getBorrowItemByBookStats(): Promise<(import("../generated/internal/prismaNamespace").PickEnumerable<import("../generated/models").BorrowItemGroupByOutputType, "bookId"[]> & {
        _sum: {
            quantity: number | null;
        };
    })[]>;
    getBorrowItemStats(): Promise<import("../generated/models").GetBorrowItemAggregateType<{
        _sum: {
            quantity: true;
        };
        _count: {
            id: true;
        };
    }>>;
}
//# sourceMappingURL=borrowItem.repository.d.ts.map