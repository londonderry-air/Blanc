import { APIResult } from '$/types/api'
import { BlancFile } from '@prisma/client'

export type Methods = {
  get: {
    query: { id: string }
    resBody: BlancFile | null
  }
  post: {
    reqFormat: FormData
    reqBody: {
      file: Blob
      id: string
      name: string
      size: number
      width: number
      height: number
    }
    resBody: BlancFile
  }
  delete: {
    reqBody: string[]
    resBody: APIResult
  }
}
