export declare const getAllItems: ({ page, limit, }: {
    page: number;
    limit: number;
}) => Promise<{
    total: number;
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
        borrowRecordId: number;
        bookId: string;
        quantity: number;
    })[];
}>;
export declare const getItemById: (id: number) => Promise<{
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
    borrowRecordId: number;
    bookId: string;
    quantity: number;
}>;
//# sourceMappingURL=borrow_Item.service.d.ts.map