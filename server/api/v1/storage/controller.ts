import { defineController } from './$relay'
import { Storage } from '@google-cloud/storage'
import { randomUUID } from 'crypto'
import {
  createBlancFile,
  deleteBlancFile,
  getBlancFile
} from '$/service/admin/blancfile'
import { GCP_PROJECT_ID, GCP_CLIENT_EMAIL, GCP_PRIVATE_KEY, GCP_BUCKETNAME } from '$/service/envValues'

export default defineController(() => ({
  get: async ({ query }) => {
    return { status: 200, body: await getBlancFile(query.id) }
  },
  post: async ({ body }) => {
    try {
      const storage = new Storage({
        projectId: GCP_PROJECT_ID,
        credentials: {
          client_email: GCP_CLIENT_EMAIL,
          private_key: GCP_PRIVATE_KEY
        }
      })
      const bucket = storage.bucket(GCP_BUCKETNAME)
      const filename = `${randomUUID()}.${body.file.filename.split('.').pop()}`
      const file = bucket.file(filename)
      const content = await body.file.toBuffer()
      await file.save(content, {
        metadata: { contentType: body.file.mimetype }
      })
      return {
        status: 200,
        body: await createBlancFile({
          id: body.id,
          name: body.name,
          size: body.size,
          width: body.width,
          height: body.height,
          url: `https://storage.googleapis.com/${bucket.name}/${filename}`
        })
      }
    } catch (e) {
      console.log(e)
      return { status: 400, body: e }
    }
  },
  delete: async ({ body }) => {
    try {
      console.log(body)
      await deleteBlancFile(body)
      return { status: 200, body: { status: 'success' } }
    } catch (e) {
      console.log(e)
      return { status: 400, body: { status: 'failed' } }
    }
  }
}))
