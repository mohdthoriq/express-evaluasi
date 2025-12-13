import { getPrisma } from "../prisma";

const prisma = getPrisma()

export const getAllBooks = async() => {
    const books = await prisma.book.findMany({
        where: { deletedAt: null },
        include: { category: true },
    })
    const total = books.length;
    return { books, total }
}
   

export const getBookById = async(id: string) => {
    const book =  await prisma.book.findFirst({
        where: { id, deletedAt: null },
        include: { category: true },
    });

    if(!book) {
        throw new Error("Buku tidak ditemukan");
    }

    return book;
}

export const searchBooks = async(keyword?: String, max_price?: String, min_price?: String) => {
    const filters : any = { deletedAt: null };
    if (keyword) {
        filters.OR = [
            { title: { contains: keyword, mode: "insensitive" } },
            { author: { contains: keyword, mode: "insensitive" } },
        ];
    }

    if (max_price || min_price) {
        filters.price = {};
        if (max_price) {
            filters.price.lte = Number(max_price);
        }
        if (min_price) {
            filters.price.gte = Number(min_price);
        }
    }
    return await prisma.book.findMany({
        where: filters,
        include: { category: true },
    });
}

export const createBook = async(title: string, author: string, year: number, price: number, categoryId: string) => {
    if (isNaN(price)) {
        throw new Error("Harga harus berupa angka");
    }

    if (isNaN(year) || year.toString().length !== 4) {
        throw new Error("Tahun harus berupa angka 4 digit");
    }

    return await prisma.book.create({
        data: {
            title,
            author,
            year,
            price,
            categoryId,
        }
    })
}

export const updateBook = async(id: string, data: any) => {
    const exist = await prisma.book.findUnique({ where: { id, }, });
    if (!exist) {
        throw new Error("Buku tidak ditemukan");
    }

    return await prisma.book.update({
        where: { id },
        data,
    });
}

export const deleteBook = async(id: string) => {
    const exist = await prisma.book.findUnique({ where: { id, }, });
    if (!exist) {
        throw new Error("Buku tidak ditemukan");
    }

    await prisma.book.update({
        where: { id },
        data: { deletedAt: new Date() },
    });
}
