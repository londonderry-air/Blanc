import {
  deletePost,
  getPost,
  isValidPost,
  updatePost
} from '$/service/admin/post'
import { Prisma } from '@prisma/client'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async ({ query }) => ({ status: 200, body: await getPost(query.id) }),
  put: async ({ body }) => {
    try {
      if (!body.id || !body.elements) {
        return { status: 400, body: { status: 'failed' } }
      }

      const isValid = await isValidPost(body)

      console.log(isValid)

      if (isValid.status === 'invalid') {
        return {
          status: 200,
          body: { status: 'failed', exception: isValid.exception }
        }
      }

      const updateData: Prisma.PostUpdateInput = {
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
      }
      if (body.categoryId) {
        updateData.category = { connect: { id: body.categoryId } }
      }
      if (body.metaOgImageId) {
        updateData.metaOgImage = { connect: { id: body.metaOgImageId } }
      }
      await updatePost(body.id, updateData)
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
