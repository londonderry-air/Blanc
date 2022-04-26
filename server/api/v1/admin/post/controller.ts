import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost
} from '$/service/admin/post'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async () => {
    return { status: 200, body: await getAllPosts() }
  },
  post: async ({ body }) => ({
    status: 201,
    body: await createPost(body.title, body.slug, body.contentId)
  }),
  put: async ({ body }) => {
    try {
      if (!body.id || !body.elements) {
        return { status: 400, body: { status: 'failed' } }
      }
      await updatePost(body.id, {
        title: body.title,
        slug: body.slug,
        publish: body.publish,
        elements: body.elements,
        from: body.from,
        to: body.to,
        updated: body.updated
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
