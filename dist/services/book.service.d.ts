export declare const getAllBooks: ({ page, limit, search, sortBy, sortOrder, }: {
    page: number;
    limit: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}) => Promise<{
    data: ({
        category: {
            id: string;
            name: string;
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
        image: string;
        stock: number;
        categoryId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    })[];
    total: number;
    totalPages: number;
    currentPage: number;
}>;
export declare const getBookById: (id: string) => Promise<{
    category: {
        id: string;
        name: string;
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
    image: string;
    stock: number;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}>;
export declare const searchBooks: (keyword?: string, min_price?: string, max_price?: string) => Promise<({
    category: {
        id: string;
        name: string;
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
    image: string;
    stock: number;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
})[]>;
export declare const createBook: ({ title, author, year, price, image, categoryId, }: {
    title: string;
    author: string;
    year: number;
    price: number;
    image: string;
    categoryId: string;
}) => Promise<{
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
}>;
export declare const updateBook: (id: string, data: any) => Promise<{
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
}>;
export declare const deleteBook: (id: string) => Promise<void>;
//# sourceMappingURL=book.service.d.ts.map