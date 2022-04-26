import { Content, Category, ItemParam, Post, Item } from '@prisma/client'

export type ContentWithRelation = Content & {
  posts: Post[]
  items: Item[]
  categories: Category[]
  itemParams: ItemParam[]
}
