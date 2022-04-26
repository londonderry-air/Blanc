import { createBlancUser, isSignin } from '$/service/admin/user'
import { defineController } from './$relay'

export default defineController(() => ({
  get: () => {
    return { status: 200, body: 'Hello' }
  },
  post: async ({ body }) => {
    const isCreatable = await isSignin(body.email)
    if (isCreatable) {
      const user = await createBlancUser('新しいユーザー', body.email, false)
      return { status: 200, body: { user } }
    }
    return { status: 200, body: { user: null } }
  }
}))
