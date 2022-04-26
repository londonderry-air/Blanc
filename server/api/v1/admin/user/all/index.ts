import { BlancFile } from '@prisma/client'
import { BlancUser } from '@prisma/client'

export type Methods = {
  get: {
    resBody: (BlancUser & { image: BlancFile | null })[] | null
  }
}
