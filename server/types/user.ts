import { BlancFile } from '@prisma/client'
import { BlancUser } from '@prisma/client'

export type BlancUserWithRelation = BlancUser & {
  image: BlancFile | null
}
