import { Post, Category, Content, BlancFile, Item } from '@prisma/client'
import { ClientCategory } from './category'
import { ClientItem } from './item'

export type PostWithRelation = Post & {
  category: Category | null
  content: Content | null
  item:
    | (Item & {
        thumbnail: BlancFile | null
      })
    | null
}

export type EditPost = Post & {
  category: Category | null
  content:
    | (Content & {
        categories: Category[]
      })
    | null
  metaOgImage: BlancFile | null
}

export type ClientPost = Omit<
  Post,
  'contentId' | 'categoryId' | 'itemId' | 'publish'
> & { item: ClientItem | null; category: ClientCategory | null }
