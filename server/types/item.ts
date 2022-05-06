import { Item, BlancFile, Content, ItemParam } from '@prisma/client'
import { ClientBlancFile } from './file'

export type ItemParamType =
  | 'text'
  | 'area'
  | 'number'
  | 'date'
  | 'switch'
  | 'image'
  | 'json'

export type ItemWithRelation = Item & {
  thumbnail: BlancFile | null
  content:
    | (Content & {
        itemParams: ItemParam[]
      })
    | null
}

export type ItemWithThumbnail = Item & {
  thumbnail: BlancFile | null
}

export type ClientItem = Omit<Item, 'contentId' | 'thumbnailId' | 'public'> & {
  thumbnail: ClientBlancFile | null
}
