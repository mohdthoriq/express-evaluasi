import type { Prisma } from "../src/generated/prisma/client";
export declare const findAll: ({ skip, take, where, orderBy, }: {
    skip: number;
    take: number;
    where: Prisma.BookWhereInput;
    orderBy: Prisma.BookOrderByWithRelationInput;
}) => Promise<{
    books: ({
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
}>;
export declare function findById(id: string): Promise<({
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
}) | null>;
export declare function search(filters: Prisma.BookWhereInput): Promise<({
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
export declare function create(data: {
    title: string;
    author: string;
    year: number;
    price: number;
    image: string;
    categoryId: string;
}): Promise<{
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
export declare function update(id: string, data: Prisma.BookUpdateInput): Promise<{
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
export declare function softDelete(id: string): Promise<{
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
export declare const findByIdTx: (tx: any, id: string) => any;
export declare const decrementStock: (tx: any, id: string, qty: number) => any;
export declare const incrementStock: (tx: any, id: string, qty: number) => any;
//# sourceMappingURL=book.repository.d.ts.map