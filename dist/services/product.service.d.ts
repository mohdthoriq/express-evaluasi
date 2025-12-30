export declare const getAllBooks: () => {
    books: import("../models/product.model.js").Books[];
    total: number;
};
export declare const getBookById: (id: string) => import("../models/product.model.js").Books;
export declare const searchBooks: (name?: string, max_price?: string, min_price?: string) => import("../models/product.model.js").Books[];
export declare const createBook: (judul: string, penulis: string, tahun: number, harga: number, category: "komik" | "novel") => import("../models/product.model.js").Books[];
export declare const updateBook: (id: string, data: any) => import("../models/product.model.js").Books | undefined;
export declare const deleteBook: (id: string) => import("../models/product.model.js").Books[];
//# sourceMappingURL=product.service.d.ts.map
