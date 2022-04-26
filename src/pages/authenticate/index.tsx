import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { apiClient } from '~/utils/apiClient'

export const Page = () => {
  const session = useSession()
  const router = useRouter()
  const redirect = useCallback(async () => {
    const { body: userCount } = await apiClient.v1.admin.user.count.get()
    const isInitial = userCount === 0

    if (isInitial) {
      router.replace('/hello')
      return
    }

    if (session.status === 'authenticated') {
      const user = session.data.user

      if (!user.isBlancUser) {
        router.replace('/authenticate/unregistered')
      } else if (user.isFirstLogin) {
        router.replace('/onbording')
      } else {
        router.replace('/post')
      }
    }

    if (session.status === 'unauthenticated') {
      signIn()
    }
  }, [session.status])

  useEffect(() => {
    redirect()
  }, [session.status])

  return <></>
}

export default Page
