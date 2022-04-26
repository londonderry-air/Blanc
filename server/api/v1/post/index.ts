import { ClientPost } from '$/types/post'

export type Methods = {
  get: {
    query: {
      slug: string
    }
    resBody: ClientPost | null
  }
}
