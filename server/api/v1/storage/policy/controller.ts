import { getStoragePolicy } from '$/service/admin/storage'
import { defineController } from './$relay'

export default defineController(() => ({
  post: async ({ body }) => ({
    status: 200,
    body: await getStoragePolicy(body)
  })
}))
