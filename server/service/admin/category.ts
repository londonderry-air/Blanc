import { Category, Content, Prisma, PrismaClient } from '@prisma/client'
import { depend } from 'velona'

const prisma = new PrismaClient()

export const getAllCategories = depend(
  { prisma: prisma as { category: { findMany(): Promise<Category[]> } } },
  async ({ prisma }) => {
    return await prisma.category.findMany()
  }
)

export const getCategories = (contentId: Content['id']) => {
  return prisma.category.findMany({
    where: { contentId }
  })
}

export const createCategory = async (
  contentId: Content['id'],
  name: Category['name']
) => {
  return prisma.category.create({
    data: {
      name,
      contentId
    }
  })
}

export const updateCategory = (
  id: Category['id'],
  category: Prisma.CategoryUpdateInput
) =>
  prisma.category.update({
    where: { id },
    data: {
      name: category.name,
      updated: new Date()
    }
  })
