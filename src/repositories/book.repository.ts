import { getPrisma } from "../prisma";
import type { Prisma } from "../src/generated/prisma/client";

const prisma = getPrisma()

export const findAll = async ({
  skip,
  take,
  where,
  orderBy,
}: {
  skip: number
  take: number
  where: Prisma.BookWhereInput
  orderBy: Prisma.BookOrderByWithRelationInput
}) => {
  const books = await prisma.book.findMany({
    skip,
    take,
    where,
    orderBy,
    include: { category: true },
  })

  const total = await prisma.book.count({ where })

  return { books, total }
}
export async function findById(id: string){
    return prisma.book.findFirst({
        where: { id, deletedAt: null },
        include: { category: true }
    })
}

export async function search(filters: Prisma.BookWhereInput){
    return prisma.book.findMany({
        where: filters,
        include: { category: true }
    })
}

export async function create(data: {
    title: string,
    author: string,
    year: number,
    price: number,
    image: string,
    categoryId: string
}) {
    return prisma.book.create({
        data
    })
}

export async function update(id: string, data: Prisma.BookUpdateInput){
    return prisma.book.update({
        where: { id },
        data
    })
}

export async function softDelete(id: string){
    return prisma.book.update({
        where: { id },
        data: { deletedAt: new Date() }
    })
}

export const findByIdTx = (tx: any, id: string) => {
  return tx.book.findUnique({ where: { id } })
}

export const decrementStock = (tx: any, id: string, qty: number) => {
  return tx.book.update({
    where: { id },
    data: { stock: { decrement: qty } }
  })
}

export const incrementStock = (tx: any, id: string, qty: number) => {
  return tx.book.update({
    where: { id },
    data: { stock: { increment: qty } }
  })
}
