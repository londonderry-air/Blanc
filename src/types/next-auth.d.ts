import NextAuth from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      name: string
      email: string
      image: string
      blancId: string
      blancName: string
      blancImage: string
      isBlancUser: boolean
      isFirstLogin: boolean
      isOwner: boolean
    }
  }
}
