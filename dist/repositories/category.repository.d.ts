export declare const findAll: ({ skip, take, }: {
    skip: number;
    take: number;
}) => Promise<{
    categories: {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }[];
    total: number;
}>;
export declare function findById(id: string): Promise<({
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
}) | null>;
export declare function create(name: string): Promise<{
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}>;
export declare function update(id: string, name: string): Promise<{
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}>;
export declare function softDelete(id: string): Promise<{
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}>;
//# sourceMappingURL=category.repository.d.ts.map