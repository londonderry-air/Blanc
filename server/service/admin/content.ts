import { DBValidationResult } from '$/types/api'
import { exceptions } from '$/utils/messages/exceptions'
import { Content, Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getContents = async () => {
  return prisma.content.findMany({
    include: { categories: true, itemParams: true, posts: true, items: true }
  })
}

export const createContent = (name: Content['name']) => {
  return prisma.content.create({
    data: {
      name: name,
      slug: name
    }
  })
}

export const getContent = async (id: Content['id']) => {
  return prisma.content.findUnique({
    where: { id },
    include: { categories: true, itemParams: true, posts: true, items: true }
  })
}

export const updateContent = (
  id: Content['id'],
  content: Prisma.ContentUpdateInput
) =>
  prisma.content.update({
    where: { id },
    data: {
      name: content.name,
      slug: content.slug,
      isAutoPostCreateWithItem: content.isAutoPostCreateWithItem,
      updated: new Date()
    }
  })

export const isValidContent = async (
  content: Content
): Promise<DBValidationResult> => {
  const allContents = await prisma.content.findMany()
  const isSameSlugExists = allContents.some(
    (c) => c.slug === content.slug && c.id !== content.id
  )

  if (isSameSlugExists) {
    return {
      status: 'invalid',
      exception: exceptions.content.same_slug
    }
  }

  return { status: 'valid' }
}
