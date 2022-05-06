import useAspidaSWR from '@aspida/swr'
import { PostEditHeader } from '~/components/organisms/post-edit-header'
import { apiClient } from '~/utils/apiClient'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { PostEdit } from '~/components/templates/post-edit'
import { Post } from '@prisma/client'
import { MessageModal } from '~/components/molucules/modal'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { themeColorState, deleteFileList, notifierState } from '~/states/atoms'
import { useSession } from 'next-auth/react'
import { EditPost } from '$/types/post'
import { BlancElement } from '$/types/_element'
import { FlexBox } from '~/components/atoms/box/flex'

const HEADER_SIZE = {
  width: '100%',
  height: '86px'
}

export const Page = () => {
  // const { data: session, status: sessionStatus } = useSession()
  const router = useRouter()
  const { id } = router.query
  const { data: post, mutate } = useAspidaSWR(apiClient.v1.admin.post.id, {
    query: { id: id ? (id as string) : '' }
  })
  const deleteList = useRef<string[]>([])
  const [deleteFiles, setDeleteFiles] = useRecoilState(deleteFileList)
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false)
  const color = useRecoilValue(themeColorState)
  const setNotifier = useSetRecoilState(notifierState)

  const onDelete = useCallback(async (p: Post) => {
    if (!p) return
    const res = await apiClient.v1.post.id.delete({ body: p.id })
    setNotifier({
      state: 'success',
      message: {
        main: '投稿が削除されました'
      }
    })
    if (res.body.status === 'success') {
      router.replace('/post')
    }
  }, [])

  const onSave = useCallback(async (p: EditPost) => {
    console.log(p)
    try {
      (p.elements as unknown as BlancElement[]).forEach(elm => {
        delete elm.post
      })
      const res = await apiClient.v1.post.id.put({ body: p })
      await apiClient.v1.storage.delete({
        body: deleteList.current
      })
      if (res.body.status === 'success') {
        setNotifier({
          state: 'success',
          message: {
            main: '投稿を保存しました'
          }
        })
      }
      if (res.body.status === 'failed') {
        setNotifier({
          state: 'caution',
          message: {
            main:
              res.body.exception?.content.jp ??
              'コンテンツを保存できませんでした',
            sub: res.body.exception?.solution.jp ?? ''
          }
        })
      }
      mutate()
    } catch (e) {
      console.log(e)
      setNotifier({
        state: 'caution',
        message: {
          main: '投稿を保存できませんでした',
          sub: 'お手数をおかけしますが、時間をおいて再度お試しください。'
        }
      })
    }
  }, [])

  useEffect(() => {
    // recoilの内容が onSave にて反映されないため、useRefに保存してから参照する
    deleteList.current = deleteFiles
  }, [deleteFiles])

  useEffect(() => {
    // initialize delete files
    setDeleteFiles([])
  }, [])

  if (!post) {
    return <div></div>
  }

  console.log(post)

  return (
    <>
      <FlexBox 
        way={'column'}
        width={'100vw'}
        height={'100vh'}
        overflow={{x: 'hidden', y: 'hidden'}}
      >
        <PostEditHeader
          post={post}
          size={HEADER_SIZE}
          onSave={async () => { onSave(post) }}
          onDelete={() => setDeleteModalVisible(true)}
        />
        <FlexBox way={'column'} width={'100%'} grow={'1'}>
          <PostEdit post={post} height={`calc(100vh - ${HEADER_SIZE.height})`} />
        </FlexBox>
      </FlexBox>
      <MessageModal
        type={'caution'}
        message={`この投稿を削除してもよろしいですか？\n削除された投稿は復元することができません。`}
        isVisible={isDeleteModalVisible}
        buttons={[
          {
            title: 'キャンセル',
            subTitle: 'CANCEL',
            color: color.text,
            onClick: () => setDeleteModalVisible(false)
          },
          {
            title: '削除',
            subTitle: 'DELETE',
            color: color.caution,
            onClick: () => onDelete(post)
          }
        ]}
      />
    </>
  )
}

export default Page
