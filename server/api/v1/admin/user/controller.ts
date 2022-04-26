import {
  createBlancUser,
  deleteBlancUser,
  getBlancUser,
  updateBlancUser
} from '$/service/admin/user'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async ({ query }) => {
    return { status: 200, body: await getBlancUser(query) }
  },
  post: async ({ body }) => {
    return { status: 200, body: await updateBlancUser(body) }
  },
  put: async ({ body }) => {
    return {
      status: 200,
      body: await createBlancUser(body.name, body.email, body.isOnline)
    }
  },
  delete: async ({ query }) => {
    await deleteBlancUser(query.id)
    return { status: 200, body: { status: 'success' } }
  }
}))
