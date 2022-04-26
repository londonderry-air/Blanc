import fs from 'fs'
import path from 'path'
import { Multipart } from 'fastify-multipart'
import {
  API_ORIGIN,
  API_USER_ID,
  API_USER_PASS,
  API_UPLOAD_DIR
} from '../envValues'
import { BlancUser, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const iconsDir = API_UPLOAD_DIR && path.resolve(API_UPLOAD_DIR, 'icons')
const createIconURL = (dir: string, name: string) =>
  `${API_ORIGIN}/${dir}icons/${name}`
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getUserIconName = (_id: string) => {
  return `user-icon`
}
export const getUserInfo = (id: string) => {
  const iconName = getUserIconName(id)
  return {
    name: 'sample user',
    icon:
      iconsDir && fs.existsSync(path.resolve(iconsDir, iconName))
        ? createIconURL('upload/', iconName)
        : createIconURL('static/', `dummy.svg`)
  }
}

export const validateUser = (id: string, pass: string) =>
  id === API_USER_ID && pass === API_USER_PASS

export const getUserInfoById = (id: string) => ({ id, ...getUserInfo(id) })

export const changeIcon = async (id: string, iconFile: Multipart) => {
  const iconName = getUserIconName(id)

  if (!iconsDir) {
    throw new Error('API_UPLOAD_DIR is not configured.')
  }

  await fs.promises.mkdir(iconsDir, { recursive: true })

  await fs.promises.writeFile(
    path.resolve(iconsDir, iconName),
    await iconFile.toBuffer()
  )

  return {
    id,
    ...getUserInfo(id)
  }
}

export const isSignin = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        accounts: true,
        sessions: true
      }
    })
    if (user && user.sessions.length > 0) {
      const now = new Date()
      const expire = new Date(user.sessions[0].expires)
      const isNotExpired = expire > now
      if (isNotExpired) {
        return true
      }
    }
    return false
  } catch (e) {
    return false
  }
}

export const getUserCount = async () => {
  const users = await prisma.blancUser.findMany()
  return users.length
}

export const createBlancUser = async (
  name: string,
  email: string,
  isOnline: boolean
) => {
  const userCount = await getUserCount()
  const isOwner = userCount === 0 // 初回のユーザーをオーナーとする
  return prisma.blancUser.create({
    data: {
      name,
      email,
      isOwner,
      isOnline
    }
  })
}

export const updateBlancUser = async (
  user: Partial<
    Pick<
      BlancUser,
      | 'email'
      | 'name'
      | 'imageId'
      | 'blancId'
      | 'isOnline'
      | 'isFirstLogin'
      | 'lastLogin'
      | 'updated'
    >
  >
) => {
  const target = await prisma.blancUser.findUnique({
    where: {
      email: user.email ?? ''
    }
  })
  const isTargetExist = target !== null
  if (!isTargetExist) {
    return null
  }
  return prisma.blancUser.update({
    where: {
      email: user.email ?? ''
    },
    data: {
      name: user.name,
      imageId: user.imageId,
      blancId: user.blancId,
      isFirstLogin: user.isFirstLogin,
      isOnline: user.isOnline,
      lastLogin: user.lastLogin,
      updated: new Date()
    }
  })
}

export const getBlancUser = async (user: { id?: string; email?: string }) => {
  const query: { id?: string; email?: string } = {}
  if (user.id) query.id = user.id
  if (user.email) query.email = user.email
  return await prisma.blancUser.findUnique({
    where: query,
    include: {
      image: true
    }
  })
}
export const getAllBlancUser = async () =>
  prisma.blancUser.findMany({
    include: {
      image: true
    }
  })

export const deleteBlancUser = async (id?: string) => {
  return await prisma.blancUser.delete({
    where: { id },
    include: {
      image: true
    }
  })
}
