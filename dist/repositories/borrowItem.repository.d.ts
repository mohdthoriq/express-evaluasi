export declare const findAll: ({ skip, take, }: {
    skip: number;
    take: number;
}) => Promise<{
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
    total: number;
}>;
export declare const findById: (id: number) => Promise<({
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
}) | null>;
//# sourceMappingURL=borrowItem.repository.d.ts.map