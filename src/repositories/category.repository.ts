import { getPrisma } from "../prisma";

const prisma = getPrisma()

export const findAll = async ({
  skip,
  take,
}: {
  skip: number
  take: number
}) => {
  const categories = await prisma.category.findMany({
    skip,
    take,
    orderBy: { createdAt: "desc" }
  })

  const total = await prisma.category.count()

  return { categories, total }
}

export async function findById(id: string) {
    return prisma.category.findFirst({
        where: { id, deletedAt: null },
        include: { books: {
            where: { deletedAt: null }
        }}
    })
}

export async function create(name: string) {
    return prisma.category.create({
        data: { name }
    })
}

export async function update(id: string, name: string){
    return prisma.category.update({
        where: { id },
        data: { name }
    })
}

export async function softDelete(id: string){
    return prisma.category.update({
        where: { id },
        data: { deletedAt: new Date() }
    })
}