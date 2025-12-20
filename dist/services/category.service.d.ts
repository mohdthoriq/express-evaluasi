export declare const getAllCategories: ({ page, limit, }: {
    page: number;
    limit: number;
}) => Promise<{
    total: number;
    categories: {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }[];
}>;
export declare const getCategoryById: (id: string) => Promise<{
    books: {
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
    }[];
} & {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}>;
export declare const createCategory: (name: string) => Promise<{
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}>;
export declare const updateCategory: (id: string, name: string) => Promise<{
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}>;
export declare const deleteCategory: (id: string) => Promise<{
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}>;
//# sourceMappingURL=category.service.d.ts.map