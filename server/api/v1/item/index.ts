import { BlancFile, Content, Item } from '@prisma/client'

export type Methods = {
  get: {
    resBody: (Item & {
      thumbnail: BlancFile | null
    })[]
  }
  post: {
    reqBody: {
      contentId: Content['id']
    }
    resBody: Item
  }
}
