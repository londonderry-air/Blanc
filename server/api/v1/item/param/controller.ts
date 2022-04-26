import {
  createItemParam,
  deleteItemParam,
  getItemParams,
  updateItemParam
} from '$/service/admin/item'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async ({ query }) => ({
    status: 200,
    body: await getItemParams(query.content)
  }),
  post: async ({ body }) => ({
    status: 201,
    body: await createItemParam(body.contentId, body.type)
  }),
  put: async ({ body }) => {
    try {
      if (!body.id) return { status: 400, body: { status: 'failed' } }
      await updateItemParam(body.id, body)
      console.log(body)
      return { status: 200, body: { status: 'success' } }
    } catch (e) {
      throw { status: 400, body: { status: 'failed' } }
    }
  },
  delete: async ({ body }) => {
    await deleteItemParam(body)
    return { status: 204 }
  }
}))
