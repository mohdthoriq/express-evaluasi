import type { Prisma } from "../generated";
import type { BorrowRecordRepository } from "../repositories/borrowRecord.repository";
import type { BookRepository } from "../repositories/book.repository";
export interface IBorrowRecordService {
    createBorrow(userId: number, items: {
        bookId: string;
        quantity: number;
    }[]): Promise<any>;
    returnBorrow(borrowId: number): Promise<any>;
    getMyBorrows(userId: number): Promise<any>;
    getAllBorrows(params: {
        page: number;
        limit: number;
    }): Promise<{
        total: number;
        items: any[];
    }>;
    getBorrowById(id: number): Promise<any>;
    deleteBorrow(borrowId: number): Promise<any>;
    exec(): Promise<any>;
}
export declare class BorrowRecordService implements IBorrowRecordService {
    private borrowRepo;
    private bookRepo;
    private prisma;
    constructor(borrowRepo: BorrowRecordRepository, bookRepo: BookRepository, prisma: Prisma.TransactionClient | any);
    createBorrow(userId: number, items: {
        bookId: string;
        quantity: number;
    }[]): Promise<any>;
    returnBorrow(borrowId: number): Promise<any>;
    getMyBorrows(userId: number): Promise<({
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
        } & {
            id: number;
            quantity: number;
            borrowRecordId: number;
            bookId: string;
        })[];
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        borrowDate: Date;
        returnDate: Date | null;
        status: string;
    })[]>;
    getAllBorrows({ page, limit }: {
        page: number;
        limit: number;
    }): Promise<{
        items: ({
            user: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                username: string;
                email: string;
                password: string;
                role: string;
            };
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
            } & {
                id: number;
                quantity: number;
                borrowRecordId: number;
                bookId: string;
            })[];
        } & {
            id: number;
            createdAt: Date;
            userId: number;
            borrowDate: Date;
            returnDate: Date | null;
            status: string;
        })[];
        total: number;
    }>;
    getBorrowById(id: number): Promise<{
        user: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            username: string;
            email: string;
            password: string;
            role: string;
        };
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
        } & {
            id: number;
            quantity: number;
            borrowRecordId: number;
            bookId: string;
        })[];
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        borrowDate: Date;
        returnDate: Date | null;
        status: string;
    }>;
    deleteBorrow(borrowId: number): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        borrowDate: Date;
        returnDate: Date | null;
        status: string;
    }>;
    exec(): Promise<{
        overView: Prisma.GetBorrowRecordAggregateType<{
            _count: {
                id: true;
            };
        }>;
        byUser: (Prisma.PickEnumerable<Prisma.BorrowRecordGroupByOutputType, "userId"[]> & {
            _count: {
                id: number;
            };
        })[];
        byReturnStatus: {
            returnDate: boolean;
            _count: {
                id: number;
            };
        }[];
    }>;
}
//# sourceMappingURL=borrowRecord.service.d.ts.map