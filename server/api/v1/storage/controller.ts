import { defineController } from './$relay'
import { Storage } from '@google-cloud/storage'
import { randomUUID } from 'crypto'
import {
  createBlancFile,
  deleteBlancFile,
  getBlancFile
} from '$/service/admin/blancfile'

export default defineController(() => ({
  get: async ({ query }) => {
    return { status: 200, body: await getBlancFile(query.id) }
  },
  post: async ({ body }) => {
    try {
      if (!process.env.GCP_BUCKETNAME) return { status: 400, body: '' }
      const storage = new Storage({
        projectId: process.env.GCP_PROJECT_ID,
        credentials: {
          client_email: process.env.GCP_CLIENT_EMAIL,
          private_key: process.env.GCP_PRIVATE_KEY ? process.env.GCP_PRIVATE_KEY.replace(/\\n/g, '\n') : ''
        }
      })
      const bucket = storage.bucket(process.env.GCP_BUCKETNAME)
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
