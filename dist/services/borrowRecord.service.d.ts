export declare const createBorrow: (userId: number, items: {
    bookId: string;
    quantity: number;
}[]) => Promise<any>;
export declare const returnBorrow: (borrowId: number) => Promise<any>;
export declare const getMyBorrows: (userId: number) => Promise<({
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
export declare const getAllBorrows: ({ page, limit, }: {
    page: number;
    limit: number;
}) => Promise<{
    total: number;
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
}>;
export declare const getBorrowById: (id: number) => Promise<{
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
}>;
export declare const deleteBorrow: (borrowId: number) => Promise<{
    id: number;
    createdAt: Date;
    userId: number;
    borrowDate: Date;
    returnDate: Date | null;
    status: string;
}>;
//# sourceMappingURL=borrowRecord.service.d.ts.map