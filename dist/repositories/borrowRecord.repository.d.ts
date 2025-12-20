export declare const createBorrowRecord: (tx: any, data: {
    userId: number;
    items: {
        bookId: string;
        quantity: number;
    }[];
}) => any;
export declare const findBorrowByIdTx: (tx: any, borrowId: number) => any;
export declare const updateReturnDate: (tx: any, borrowId: number) => any;
export declare const findBorrowsByUserId: (userId: number) => import("../src/generated/prisma/internal/prismaNamespace").PrismaPromise<({
    items: ({
        book: {
            id: string;
            title: string;
            author: string;
            year: number;
            price: number;
            image: string;
            stock: number;
            categoryId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
    } & {
        id: number;
        borrowRecordId: number;
        bookId: string;
        quantity: number;
    })[];
} & {
    id: number;
    createdAt: Date;
    userId: number;
    borrowDate: Date;
    returnDate: Date | null;
    status: string;
})[]>;
export declare const findAllBorrows: ({ skip, take, }: {
    skip: number;
    take: number;
}) => Promise<{
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
                image: string;
                stock: number;
                categoryId: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
            };
        } & {
            id: number;
            borrowRecordId: number;
            bookId: string;
            quantity: number;
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
export declare const findBorrowById: (id: number) => import("../src/generated/prisma/models").Prisma__BorrowRecordClient<({
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
            image: string;
            stock: number;
            categoryId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
    } & {
        id: number;
        borrowRecordId: number;
        bookId: string;
        quantity: number;
    })[];
} & {
    id: number;
    createdAt: Date;
    userId: number;
    borrowDate: Date;
    returnDate: Date | null;
    status: string;
}) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: import("../src/generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
}>;
export declare const deleteById: (borrowId: number, tx?: import("../src/generated/prisma/client").PrismaClient) => Promise<{
    id: number;
    createdAt: Date;
    userId: number;
    borrowDate: Date;
    returnDate: Date | null;
    status: string;
}>;
//# sourceMappingURL=borrowRecord.repository.d.ts.map