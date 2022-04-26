import { getCategories } from '$/service/admin/category'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async ({ query }) => ({
    status: 200,
    body: await getCategories(query.contentId)
  })
}))
