import { DBValidationResult } from '$/types/api'
import { exceptions } from '$/utils/messages/exceptions'
import { Post, Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllPosts = () => {
  return prisma.post.findMany({
    include: {
      category: true,
      content: true,
      item: { include: { thumbnail: true } }
    }
  })
}

export const getEditPost = (id: Post['id']) => {
  return prisma.post.findUnique({
    where: { id },
    include: {
      category: true,
      content: { include: { categories: true } },
      item: { include: { thumbnail: true } },
      metaOgImage: true
    }
  })
}

export const getPost = (id: Post['id']) => {
  return prisma.post.findUnique({
    where: { id },
    include: { category: true, content: true }
  })
}

export const createPost = (
  title: Post['title'],
  slug: Post['slug'],
  contentId: Post['contentId'],
  itemId?: Post['itemId']
) => {
  const newData: Prisma.PostCreateInput = {
    title: title,
    slug: slug,
    elements: [],
    created: new Date(),
    from: new Date(),
    to: new Date()
  }
  if (contentId) {
    newData.content = { connect: { id: contentId } }
  }
  if (itemId) {
    newData.item = { connect: { id: itemId } }
  }
  return prisma.post.create({
    data: newData
  })
}

export const updatePost = (id: Post['id'], post: Prisma.PostUpdateInput) =>
  prisma.post.update({
    where: { id },
    data: {
      title: post.title,
      slug: post.slug,
      elements: post.elements,
      publish: post.publish,
      categoryId: post.category?.connect?.id,
      updated: new Date(),
      from: post.from,
      to: post.to,
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
      metaOgImageId: post.metaOgImage?.connect?.id,
      metaOgType: post.metaOgType,
      metaTwitterCardType: post.metaTwitterCardType
    }
  })

export const deletePost = (id: Post['id']) =>
  prisma.post.delete({ where: { id } })

export const validatePost = async (post: Post): Promise<DBValidationResult> => {
  const allPosts = await prisma.post.findMany()
  const isSameSlugExists = allPosts.some(
    (p) =>
      p.slug === post.slug && p.contentId === post.contentId && p.id !== post.id
  )

  if (isSameSlugExists) {
    return {
      status: 'invalid',
      exception: exceptions.post.same_slug
    }
  }

  return { status: 'valid' }
}
