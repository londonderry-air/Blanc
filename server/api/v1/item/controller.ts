import { createItem, getAllItems } from '$/service/admin/item'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async () => ({ status: 200, body: await getAllItems() }),
  post: async ({ body }) => ({
    status: 201,
    body: await createItem(body.contentId)
  })
}))
