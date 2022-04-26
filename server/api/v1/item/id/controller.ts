import { deleteItem, getItem, updateItem } from '$/service/admin/item'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async ({ query }) => ({ status: 200, body: await getItem(query.id) }),
  put: async ({ body }) => {
    try {
      if (!body.id || !body.data) {
        return { status: 400, body: { status: 'failed' } }
      }
      await updateItem(body.id, body)
      console.log(body)
      return { status: 200, body: { status: 'success' } }
    } catch (e) {
      console.log(e)
      throw { status: 400, body: { status: 'failed' } }
    }
  },
  delete: async ({ query }) => {
    try {
      await deleteItem(query.id)
      return { status: 200, body: { status: 'success' } }
    } catch (e) {
      throw { status: 400, body: { status: 'failed' } }
    }
  }
}))
