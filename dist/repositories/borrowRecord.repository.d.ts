import type { Prisma, PrismaClient, BorrowRecord } from "../generated";
export interface IBorrowRecordRepository {
    createBorrowRecord(tx: Prisma.TransactionClient, data: {
        userId: number;
        items: {
            bookId: string;
            quantity: number;
        }[];
    }): Promise<BorrowRecord>;
    findBorrowByIdTx(tx: Prisma.TransactionClient, borrowId: number): Promise<BorrowRecord | null>;
    updateReturnDate(tx: Prisma.TransactionClient, borrowId: number): Promise<BorrowRecord>;
    findBorrowsByUserId(userId: number): Promise<BorrowRecord[]>;
    findAll(params: {
        skip: number;
        take: number;
    }): Promise<{
        items: BorrowRecord[];
        total: number;
    }>;
    findById(id: number): Promise<BorrowRecord | null>;
    deleteById(borrowId: number, tx?: Prisma.TransactionClient): Promise<BorrowRecord>;
    getStats(): Promise<{
        _count: {
            id: number;
        };
    }>;
    getBorrowByUserStats(): Promise<{
        userId: number;
        _count: {
            id: number;
        };
    }[]>;
    getBorrowByReturnStatusStats(): Promise<{
        returnDate: Date | null;
        _count: {
            id: number;
        };
    }[]>;
}
export declare class BorrowRecordRepository implements IBorrowRecordRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    createBorrowRecord(tx: Prisma.TransactionClient, data: {
        userId: number;
        items: {
            bookId: string;
            quantity: number;
        }[];
    }): Prisma.Prisma__BorrowRecordClient<{
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
    }, never, import("../generated/runtime/client").DefaultArgs, Prisma.PrismaClientOptions>;
    findBorrowByIdTx(tx: Prisma.TransactionClient, borrowId: number): Prisma.Prisma__BorrowRecordClient<({
        items: {
            id: number;
            quantity: number;
            borrowRecordId: number;
            bookId: string;
        }[];
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        borrowDate: Date;
        returnDate: Date | null;
        status: string;
    }) | null, null, import("../generated/runtime/client").DefaultArgs, Prisma.PrismaClientOptions>;
    updateReturnDate(tx: Prisma.TransactionClient, borrowId: number): Prisma.Prisma__BorrowRecordClient<{
        id: number;
        createdAt: Date;
        userId: number;
        borrowDate: Date;
        returnDate: Date | null;
        status: string;
    }, never, import("../generated/runtime/client").DefaultArgs, Prisma.PrismaClientOptions>;
    findBorrowsByUserId(userId: number): Prisma.PrismaPromise<({
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
    findAll({ skip, take }: {
        skip: number;
        take: number;
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
    findById(id: number): Prisma.Prisma__BorrowRecordClient<({
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
    }) | null, null, import("../generated/runtime/client").DefaultArgs, Prisma.PrismaClientOptions>;
    deleteById(borrowId: number, tx?: Prisma.TransactionClient): Prisma.Prisma__BorrowRecordClient<{
        id: number;
        createdAt: Date;
        userId: number;
        borrowDate: Date;
        returnDate: Date | null;
        status: string;
    }, never, import("../generated/runtime/client").DefaultArgs, Prisma.PrismaClientOptions>;
    getStats(): Promise<Prisma.GetBorrowRecordAggregateType<{
        _count: {
            id: true;
        };
    }>>;
    getBorrowByUserStats(): Promise<(Prisma.PickEnumerable<Prisma.BorrowRecordGroupByOutputType, "userId"[]> & {
        _count: {
            id: number;
        };
    })[]>;
    getBorrowByReturnStatusStats(): Promise<(Prisma.PickEnumerable<Prisma.BorrowRecordGroupByOutputType, "returnDate"[]> & {
        _count: {
            id: number;
        };
    })[]>;
}
//# sourceMappingURL=borrowRecord.repository.d.ts.map