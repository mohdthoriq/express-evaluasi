import * as bookRepo from "../repositories/book.repository"
import type { Prisma } from "../src/generated/prisma/client"

export const getAllBooks = async ({
  page,
  limit,
  search,
  sortBy,
  sortOrder,
}: {
  page: number
  limit: number
  search?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
}) => {
  const skip = (page - 1) * limit

  const where: any = { deletedAt: null }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { author: { contains: search, mode: "insensitive" } },
    ]
  }

  const orderBy: Prisma.BookOrderByWithRelationInput = sortBy
    ? { [sortBy]: sortOrder || "desc" }
    : { createdAt: "desc" }

  const { books, total } = await bookRepo.findAll({
    skip,
    take: limit,
    where,
    orderBy,
  })

  return {
    data: books,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  }
}

export const getBookById = async (id: string) => {
  const book = await bookRepo.findById(id)

  if (!book) {
    throw new Error("Buku tidak ditemukan")
  }

  return book
}

export const searchBooks = async (
  keyword?: string,
  min_price?: string,
  max_price?: string
) => {
  const where: any = { deletedAt: null }

  if (keyword) {
    where.OR = [
      { title: { contains: keyword, mode: "insensitive" } },
      { author: { contains: keyword, mode: "insensitive" } },
    ]
  }

  if (min_price || max_price) {
    where.price = {}
    if (min_price) where.price.gte = Number(min_price)
    if (max_price) where.price.lte = Number(max_price)
  }

  return bookRepo.search(where)
}

export const createBook = async ({
  title,
  author,
  year,
  price,
  image,
  categoryId,
}: {
  title: string
  author: string
  year: number
  price: number
  image: string
  categoryId: string
}) => {
  if (isNaN(price)) {
    throw new Error("Harga harus berupa angka")
  }

  if (isNaN(year) || year.toString().length !== 4) {
    throw new Error("Tahun harus 4 digit")
  }

  return bookRepo.create({
    title,
    author,
    year,
    price,
    image,
    categoryId,
  })
}

export const updateBook = async (id: string, data: any) => {
  const existing = await bookRepo.findById(id)
  if (!existing) {
    throw new Error("Buku tidak ditemukan")
  }

  return bookRepo.update(id, data)
}

export const deleteBook = async (id: string) => {
  const existing = await bookRepo.findById(id)
  if (!existing) {
    throw new Error("Buku tidak ditemukan")
  }

  await bookRepo.softDelete(id)
}
