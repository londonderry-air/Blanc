import { BlancUser } from '@prisma/client'

export type Methods = {
  get: {
    resBody: string
  }
  post: {
    reqBody: {
      email: string
    }
    resBody: { user: BlancUser | null }
  }
}
