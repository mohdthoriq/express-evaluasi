import { getPrisma } from "../prisma";

const prisma = getPrisma()

export const getAllCategories = async () => {
    const categories = await prisma.category.findMany({
        where: {
            deletedAt: null,
        },
        include: {
            books: {
                where: { deletedAt: null },
            },
        },
    })

    const total = categories.length

    return { total, categories }
}

export const getCategoryById = async (id: string) => {
    const category = await prisma.category.findFirst({
        where: {
            id,
            deletedAt: null,
        },
        include: {
            books: {
                where: { deletedAt: null },
            },
        },
    })

    if (!category) throw new Error("kategori tidak ditemukan")

    return category
}

export const searchCategory = async(keyword?:string) => {
    return await prisma.category.findMany({
        where: {
            deletedAt: null,
            name: {
                contains: keyword || "",
                mode: "insensitive"
            }
        }
    })
}

export const createCategory = async(name: string) => {
    if (!name) throw new Error("nama kategori tidak boleh kosong")

    return await prisma.category.create({
        data: { name }
    })
}

export const updateCategory = async(id: string, name:string) => {
    const exist = await prisma.category.findUnique({
        where: { id }
    })

    if (!exist) throw new Error("kategori tidak ditemukan")

    return await prisma.category.update({
        where: { id },
        data: { name }
    })
}

export const deleteCategory = async(id: string) => {
    const exist = await prisma.category.findUnique({
        where: { id }
    })

    if (!exist) throw new Error("kategori tidak ditemukan")

    return await prisma.category.update({
        where: { id },
        data: { deletedAt: new Date() }
    })
}

