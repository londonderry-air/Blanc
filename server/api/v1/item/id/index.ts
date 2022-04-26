import { APIResult } from '$/types/api'
import { ItemWithRelation } from '$/types/item'
import { Item } from '@prisma/client'

export type Methods = {
  get: {
    query: {
      id: Item['id']
    }
    resBody: ItemWithRelation | null
  }
  put: {
    reqBody: Item
    resBody: APIResult
  }
  delete: {
    query: {
      id: Item['id']
    }
    resBody: APIResult
  }
}
