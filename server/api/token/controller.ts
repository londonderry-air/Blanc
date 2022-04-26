import { defineController } from './$relay'
import { validateUser } from '$/service/admin/user'

export default defineController((fastify) => ({
  post: ({ body }) =>
    validateUser(body.id, body.pass)
      ? { status: 201, body: { token: fastify.jwt.sign({ id: body.id }) } }
      : { status: 401 }
}))
