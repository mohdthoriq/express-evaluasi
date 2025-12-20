import { getPrisma } from "../prisma"

const prisma = getPrisma()

export const createBorrowRecord = (tx: any, data: {
  userId: number
  items: { bookId: string; quantity: number }[]
}) => {
  return tx.borrowRecord.create({
    data: {
      userId: data.userId,
      items: {
        create: data.items.map(item => ({
          bookId: item.bookId,
          quantity: item.quantity
        }))
      }
    },
    include: {
      items: {
        include: { book: true }
      }
    }
  })
}

export const findBorrowByIdTx = (tx: any, borrowId: number) => {
  return tx.borrowRecord.findUnique({
    where: { id: borrowId },
    include: { items: true }
  })
}

export const updateReturnDate = (tx: any, borrowId: number) => {
  return tx.borrowRecord.update({
    where: { id: borrowId },
    data: { returnDate: new Date() }
  })
}

export const findBorrowsByUserId = (userId: number) => {
  return prisma.borrowRecord.findMany({
    where: { userId },
    include: {
      items: { include: { book: true } }
    },
    orderBy: { createdAt: "desc" }
  })
}

export const findAllBorrows = async ({
  skip,
  take,
}: {
  skip: number
  take: number
}) => {
  const items = await prisma.borrowRecord.findMany({
    skip,
    take,
    include: {
      user: true,
      items: {
        include: { book: true },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  const total = await prisma.borrowRecord.count()

  return { items, total }
}

export const findBorrowById = (id: number) => {
  return prisma.borrowRecord.findUnique({
    where: { id },
    include: {
      user: true,
      items: { include: { book: true } }
    }
  })
}

export const deleteById = async (
  borrowId: number,
  tx = prisma
) => {
  return tx.borrowRecord.delete({
    where: { id: borrowId }
  })
}