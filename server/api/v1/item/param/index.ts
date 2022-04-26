import { APIResult } from '$/types/api'
import { ItemParamType } from '$/types/item'
import { Content, ItemParam } from '@prisma/client'

export type Methods = {
  get: {
    query: { content: Content['id'] }
    resBody: ItemParam[]
  }
  post: {
    reqBody: {
      contentId: Content['id']
      type: ItemParamType
    }
    resBody: ItemParam
  }
  put: {
    reqBody: Partial<Pick<ItemParam, 'id' | 'name' | 'paramId' | 'updated'>>
    resBody: APIResult
  }
  delete: {
    reqBody: ItemParam['id']
    status: 204
  }
}
