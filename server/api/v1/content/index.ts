import { ContentWithRelation } from '$/types/content'
import { Content } from '@prisma/client'

export type Methods = {
  get: {
    resBody: ContentWithRelation[] | null
  }
  post: {
    reqBody: Pick<Content, 'name'>
    resBody: Content
  }
}
