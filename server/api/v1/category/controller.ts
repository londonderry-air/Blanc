import {
  createCategory,
  updateCategory,
  getAllCategories
} from '$/service/admin/category'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async () => ({
    status: 200,
    body: await getAllCategories()
  }),
  post: async ({ body }) => ({
    status: 201,
    body: await createCategory(body.contentId, body.name)
  }),
  put: async ({ body }) => {
    try {
      if (!body.id) return { status: 400, body: { status: 'failed' } }
      await updateCategory(body.id, body)
      return { status: 200, body: { status: 'success' } }
    } catch (e) {
      throw { status: 400, body: { status: 'failed' } }
    }
  }
}))
