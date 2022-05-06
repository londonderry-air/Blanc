import { ItemParamType } from '$/types/item'
import { randomStr } from '$/utils/string'
import { Content, Item, ItemParam, Prisma, PrismaClient } from '@prisma/client'
import { getContent } from './content'
import { createPost } from './post'

const prisma = new PrismaClient()

export const getAllItems = () => {
  return prisma.item.findMany({ include: { thumbnail: true } })
}

export const getItem = (id: Item['id']) => {
  return prisma.item.findUnique({
    where: { id },
    include: { thumbnail: true, content: { include: { itemParams: true } } }
  })
}

export const createItem = async (contentId: Content['id']) => {
  const content = await getContent(contentId)
  const newItem = await prisma.item.create({
    data: {
      name: '新しいアイテム',
      content: { connect: { id: contentId } }
    }
  })
  if (content?.isAutoPostCreateWithItem) {
    await createPost('新しい投稿', randomStr(), contentId, newItem.id)
  }
  return newItem
}

export const getItemParams = (contentId: Content['id']) => {
  return prisma.itemParam.findMany({
    where: { contentId }
  })
}

export const createItemParam = (
  contentId: Content['id'],
  type: ItemParamType
) => {
  return prisma.itemParam.create({
    data: {
      name: '新しいパラメータ',
      type: type,
      contentId: contentId
    }
  })
}

export const updateItemParam = (
  id: ItemParam['id'],
  itemParam: Prisma.ItemParamUpdateInput
) =>
  prisma.itemParam.update({
    where: { id },
    data: {
      name: itemParam.name,
      paramId: itemParam.paramId,
      isRequired: itemParam.isRequired,
      updated: new Date()
    }
  })

export const deleteItemParam = (id: ItemParam['id']) =>
  prisma.itemParam.delete({ where: { id } })

export const updateItem = (id: Item['id'], item: Item) =>
  prisma.item.update({
    where: { id },
    data: {
      name: item.name,
      public: item.public,
      thumbnailId: item.thumbnailId,
      data: item.data ?? {},
      from: item.from,
      to: item.to,
      updated: new Date()
    }
  })

export const deleteItem = (id: Item['id']) =>
  prisma.item.delete({ where: { id } })
