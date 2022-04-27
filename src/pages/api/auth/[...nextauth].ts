import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { apiClient } from '~/utils/apiClient'
import { DEFAULT_IMAGE } from '~/utils/variable'
import { signOut } from 'next-auth/react'

const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? ''
    })
  ],
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET ?? 'secret',
  callbacks: {
    async signIn({ user }) {
      const { body: userCount } = await apiClient.v1.admin.user.count.get()
      const isInitial = userCount === 0
      const isEmailEmpty = user.email === null || user.email === undefined
      if (isEmailEmpty) {
        return false
      }
      // 初回起動
      if (isInitial) {
        // オーナー作成
        await apiClient.v1.admin.user.put({
          body: {
            name: user.name ?? 'オーナー',
            email: user.email ?? '',
            isOnline: true
          }
        })
      } else {
        // refresh Online Status
        await apiClient.v1.admin.user.post({
          body: {
            email: user.email,
            isOnline: true,
            lastLogin: new Date()
          }
        })
      }

      return true
    },
    async session({ session, user }) {
      const now = new Date()
      const expire = new Date(session.expires)
      const isEmailEmpty = user.email === null || user.email === undefined

      // expired...
      if (now > expire) {
        // refresh Online Status
        await apiClient.v1.admin.user.post({
          body: {
            email: user.email,
            isOnline: false,
            lastLogin: new Date()
          }
        })
        signOut()
      }

      if (isEmailEmpty) {
        return session
      }

      const { body: loginUser } = await apiClient.v1.admin.user.get({
        query: {
          email: user.email ?? ''
        }
      })

      // 登録されていないユーザーの場合
      if (!loginUser) {
        session.user.isBlancUser = false
        session.user.blancName = ''
        session.user.blancId = ''
        session.user.isFirstLogin = false
        return session
      }

      console.log(loginUser)

      session.user.blancName = loginUser.name ?? ''
      session.user.blancId = loginUser.blancId
      session.user.isBlancUser = true
      session.user.isFirstLogin = loginUser.isFirstLogin
      session.user.isOwner = loginUser.isOwner
      session.user.blancImage = loginUser.image
        ? loginUser.image.url ?? DEFAULT_IMAGE
        : DEFAULT_IMAGE

      return session
    },
    async redirect({ baseUrl }) {
      return baseUrl + '/authenticate'
    }
  },
  theme: {
    colorScheme: 'light', // "auto" | "dark" | "light"
    brandColor: '282836', // Hex color code
    logo: '/blanc.png' // Absolute URL to image
  }
})
