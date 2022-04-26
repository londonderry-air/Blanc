import { APIResult } from '$/types/api'
import { ContentWithRelation } from '$/types/content'
import { Content } from '@prisma/client'

export type Methods = {
  get: {
    query: {
      id: string
    }
    resBody: ContentWithRelation | null
  }
  put: {
    reqBody: Content
    resBody: APIResult
  }
}
