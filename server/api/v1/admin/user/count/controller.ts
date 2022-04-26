import { getUserCount } from '$/service/admin/user'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async () => {
    const state = await getUserCount()
    return { status: 200, body: state }
  }
}))
