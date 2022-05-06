import {
  getContent,
  validateContent,
  updateContent
} from '$/service/admin/content'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async ({ query }) => ({
    status: 200,
    body: await getContent(query.id)
  }),
  put: async ({ body }) => {
    try {
      if (!body.id) return { status: 400, body: { status: 'failed' } }
      const validateResult = await validateContent(body)

      if (validateResult .status === 'invalid') {
        return {
          status: 200,
          body: { status: 'failed', exception: validateResult .exception }
        }
      }

      await updateContent(body.id, body)
      return { status: 200, body: { status: 'success' } }
    } catch (e) {
      throw { status: 400, body: { status: 'failed' } }
    }
  }
}))
