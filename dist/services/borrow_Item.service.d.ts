import type { BorrowItem } from "../generated/client";
import type { BorrowItemRepository } from "../repositories/borrowItem.repository";
export interface IBorrowItemService {
    getAllItems(params: {
        page: number;
        limit: number;
    }): Promise<{
        total: number;
        items: BorrowItem[];
    }>;
    getItemById(id: number): Promise<BorrowItem>;
    exec(): Promise<any>;
}
export declare class BorrowItemService implements IBorrowItemService {
    private borrowItemRepo;
    constructor(borrowItemRepo: BorrowItemRepository);
    getAllItems(params: {
        page: number;
        limit: number;
    }): Promise<{
        total: number;
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
    }>;
    getItemById(id: number): Promise<{
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
    }>;
    exec(): Promise<{
        overview: {
            totalItems: number;
            totalQuantity: number;
        };
        byBook: {
            bookId: string;
            totalQuantity: number;
        }[];
    }>;
}
//# sourceMappingURL=borrow_Item.service.d.ts.map