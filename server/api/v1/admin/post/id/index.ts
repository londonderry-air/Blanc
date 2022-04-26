import { APIResult } from '$/types/api'
import { EditPost } from '$/types/post'
import { Post } from '@prisma/client'

export type Methods = {
  get: {
    query: {
      id: Post['id']
    }
    resBody: EditPost | null
  }
  put: {
    reqBody: EditPost
    resBody: APIResult
  }
  delete: {
    reqBody: Post['id']
    resBody: APIResult
  }
}
