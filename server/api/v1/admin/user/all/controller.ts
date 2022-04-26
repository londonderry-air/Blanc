import { getAllBlancUser } from '$/service/admin/user'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async () => {
    return { status: 200, body: await getAllBlancUser() }
  }
}))
