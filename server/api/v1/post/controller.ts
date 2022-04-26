import { defineController } from './$relay'
import { getPostFromSlug } from '$/service/client/post'

export default defineController(() => ({
  get: async ({ query }) => {
    const slug = query.slug
    return { status: 200, body: await getPostFromSlug(slug) }
  }
}))
