import { Category, Content } from '@prisma/client'

export type Methods = {
  get: {
    query: { contentId: Content['id'] }
    resBody: Category[]
  }
}
