import {
  deletePost,
  getEditPost,
  validatePost,
  updatePost
} from '$/service/admin/post'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async ({ query }) => ({
    status: 200,
    body: await getEditPost(query.id)
  }),
  put: async ({ body }) => {
    try {
      if (!body.id || !body.elements) {
        return { status: 400, body: { status: 'failed' } }
      }

      const isValid = await validatePost(body)

      console.log(isValid)

      if (isValid.status === 'invalid') {
        return {
          status: 200,
          body: { status: 'failed', exception: isValid.exception }
        }
      }

      await updatePost(body.id, {
        title: body.title,
        slug: body.slug,
        publish: body.publish,
        elements: body.elements,
        from: body.from,
        to: body.to,
        updated: body.updated,
        metaTitle: body.metaTitle,
        metaDescription: body.metaDescription,
        metaOgType: body.metaOgType,
        metaTwitterCardType: body.metaTwitterCardType
      })
      return { status: 200, body: { status: 'success' } }
    } catch (e) {
      throw { status: 400, body: { status: 'failed' } }
    }
  },
  delete: async ({ body }) => {
    await deletePost(body)
    return { status: 200, body: { status: 'success' } }
  }
}))
