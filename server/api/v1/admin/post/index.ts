import { APIResult } from '$/types/api'
import { PostWithRelation } from '$/types/post'
import { Post } from '@prisma/client'

export type Methods = {
  get: {
    resBody: PostWithRelation[]
  }
  post: {
    reqBody: Pick<Post, 'title' | 'slug' | 'contentId'>
    resBody: Post
  }
  put: {
    reqBody: Partial<
      Pick<
        Post,
        | 'id'
        | 'title'
        | 'slug'
        | 'publish'
        | 'elements'
        | 'from'
        | 'to'
        | 'updated'
        | 'categoryId'
      >
    >
    resBody: APIResult
  }
  delete: {
    reqBody: Post['id']
    resBody: APIResult
  }
}
