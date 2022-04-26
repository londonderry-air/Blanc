import { BlancFile, PrismaClient } from '@prisma/client'
import { Storage } from '@google-cloud/storage'

const prisma = new PrismaClient()

export const getBlancFile = (id: BlancFile['id']) => {
  return prisma.blancFile.findUnique({
    where: { id }
  })
}

export const createBlancFile = async (file: {
  id: BlancFile['id']
  name: BlancFile['name']
  size: BlancFile['size']
  width: BlancFile['width']
  height: BlancFile['height']
  url: BlancFile['url']
}) => {
  return prisma.blancFile.create({
    data: {
      id: file.id,
      name: file.name,
      size: typeof file.size === 'number' ? file.size : parseInt(file.size),
      width: typeof file.width === 'number' ? file.width : parseInt(file.width),
      height:
        typeof file.height === 'number' ? file.height : parseInt(file.height),
      url: file.url
    }
  })
}

export const deleteBlancFile = async (idList: BlancFile['id'][]) => {
  const filtered = idList.filter((id) => !['', undefined, null].includes(id))
  if (filtered.length > 0 && process.env.GCP_BUCKETNAME) {
    const deleteTargets = await prisma.blancFile.findMany({
      where: { id: { in: filtered } }
    })
    const storage = new Storage({
      projectId: process.env.PROJECT_ID,
      keyFilename: process.env.GCP_CREDENTIALS
    })
    const bucket = storage.bucket(process.env.GCP_BUCKETNAME)
    deleteTargets.forEach((target) => {
      const filename = target.url ? target.url.split('/').pop() ?? '' : ''
      console.log(filename)
      const file = bucket.file(filename)
      file.delete((err) => {
        if (err) console.log(err)
      })
    })
    prisma.blancFile.deleteMany({ where: { id: { in: filtered } } })
  }
}
