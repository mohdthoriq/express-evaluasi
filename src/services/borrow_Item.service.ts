import * as borrowItemRepo from "../repositories/borrowItem.repository"

export const getAllItems = async ({
  page,
  limit,
}: {
  page: number
  limit: number
}) => {
  const skip = (page - 1) * limit

  const { items, total } = await borrowItemRepo.findAll({
    skip,
    take: limit,
  })

  return {
    total,
    items,
  }
}


export const getItemById = async (id: number) => {
  const item = await borrowItemRepo.findById(id)

  if (!item) throw new Error("Borrow item tidak ditemukan")
  return item
}
