import { APIResult } from '$/types/api'
import { BlancUserWithRelation } from '$/types/user'
import { BlancUser } from '@prisma/client'

export type Methods = {
  get: {
    query: { email?: string; id?: string }
    resBody: BlancUserWithRelation | null
  }
  post: {
    reqBody: Partial<
      Pick<
        BlancUser,
        | 'email'
        | 'name'
        | 'imageId'
        | 'blancId'
        | 'isOnline'
        | 'lastLogin'
        | 'updated'
        | 'isFirstLogin'
      >
    >
    resBody: BlancUser | null
  }
  put: {
    reqBody: { email: string; name: string; isOnline: boolean }
    resBody: BlancUser
  }
  delete: {
    query: { id: string }
    resBody: APIResult
  }
}
