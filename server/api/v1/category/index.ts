import { APIResult } from '$/types/api'
import { Category, Content } from '@prisma/client'

export type Methods = {
  get: {
    resBody: Category[]
  }
  post: {
    reqBody: {
      contentId: Content['id']
      name: string
    }
    resBody: Category
  }
  put: {
    reqBody: Partial<Pick<Category, 'id' | 'name' | 'updated'>>
    resBody: APIResult
  }
}
