import useAspidaSWR from '@aspida/swr'
import { apiClient } from '~/utils/apiClient'
import { useCallback, useEffect } from 'react'
import { randomStr } from '~/utils/variable'
import { PostHome } from '~/components/templates/post-home'
import { Content } from '@prisma/client'
import { FadeBox } from '~/components/atoms/box/fade'
import { useSetRecoilState } from 'recoil'
import { notifierState } from '~/states/atoms'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

const Page = () => {
  // const { data: session, status: sessionStatus } = useSession()
  const { data: posts, mutate } = useAspidaSWR(apiClient.v1.admin.post)
  const { data: contents, mutate: mutateContent } = useAspidaSWR(
    apiClient.v1.content
  )
  const { data: categories, mutate: mutateCategory } = useAspidaSWR(
    apiClient.v1.category
  )
  const router = useRouter()
  const setNotifier = useSetRecoilState(notifierState)

  const createPost = useCallback(async (c: Content) => {
    const res = await apiClient.v1.admin.post.post({
      body: {
        title: '新しい投稿',
        slug: randomStr(),
        contentId: c.id
      }
    })
    setNotifier({
      state: 'success',
      message: {
        main: '投稿を作成しました'
      }
    })
    router.push(`/post/edit/${res.body.id}`)
  }, [])

  useEffect(() => {
    console.log(posts)
    console.log(contents)
    console.log(categories)
  }, [posts])

  // if (sessionStatus === 'loading') {
  //   return <></>
  // }

  // if (sessionStatus !== 'authenticated') {
  //   router.push('/authenticate')
  //   return <></>
  // }

  // if (!session) {
  //   router.push('/authenticate')
  //   return <></>
  // }

  // console.log(session)

  // if (!session.user.isBlancUser) {
  //   router.push('/authenticate')
  //   return <></>
  // }

  return (
    <>
      <FadeBox
        status={!!posts && !!contents && !!categories}
        translation={{ from: 'bottom', quantity: '10px', duration: '0.5s' }}
      >
        {!!posts && !!contents && !!categories && (
          <>
            <PostHome
              posts={posts}
              contents={contents}
              categories={categories}
              onCreate={createPost}
            ></PostHome>
          </>
        )}
      </FadeBox>
    </>
  )
}

export default Page
