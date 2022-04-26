import { createContent, getContents } from '$/service/admin/content'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async () => ({ status: 200, body: await getContents() }),
  post: async ({ body }) => ({
    status: 201,
    body: await createContent(body.name)
  })
}))
