import useAspidaSWR from '@aspida/swr'
import { PostEditHeader } from '~/components/organisms/post-edit-header'
import { apiClient } from '~/utils/apiClient'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { PostEdit } from '~/components/templates/post-edit'
import useWindowSize from '~/hooks/useWindowSize'
import { Post } from '@prisma/client'
import { MessageModal } from '~/components/molucules/modal'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { themeColorState, deleteFileList, notifierState } from '~/states/atoms'
import { useSession } from 'next-auth/react'

export const Page = () => {
  // const { data: session, status: sessionStatus } = useSession()
  const router = useRouter()
  const { id } = router.query
  const { data: post, mutate } = useAspidaSWR(apiClient.v1.admin.post.id, {
    query: { id: id ? (id as string) : '' }
  })
  const deleteList = useRef<string[]>([])
  const [deleteFiles, setDeleteFiles] = useRecoilState(deleteFileList)
  const [wrapStyle, setWrapStyle] = useState({
    // marginTop: '-60px',
    opacity: 0
  })
  const [editorHeight, setEditorHeight] = useState('auto')
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false)
  const winsize = useWindowSize()
  const color = useRecoilValue(themeColorState)
  const setNotifier = useSetRecoilState(notifierState)

  const onDelete = useCallback(async (p: Post) => {
    if (!p) return
    const res = await apiClient.v1.post.id.delete({ body: p.id })
    console.log(res)
    setNotifier({
      state: 'success',
      message: {
        main: '投稿が削除されました'
      }
    })
    if (res.body.status === 'success') {
      router.push('/post')
    }
  }, [])

  const onSave = useCallback(async () => {
    console.log(post)
    if (!post) return
    try {
      const res = await apiClient.v1.post.id.put({ body: post })
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
      console.log(post)
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
      <Wrap opacity={wrapStyle.opacity}>
        <PostEditHeader
          post={post}
          onSave={async () => { onSave() }}
          onDelete={() => setDeleteModalVisible(true)}
          onRender={(elm) => {
            const rect = elm.getBoundingClientRect()
            setEditorHeight(`${winsize.height - rect.height * 0.9}px`)
            setWrapStyle({
              // marginTop: `-${rect.height}px`,
              opacity: 1
            })
          }}
        />
        <PostEdit post={post} height={editorHeight} />
      </Wrap>
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

const Wrap = styled.div<{ opacity: number }>`
  width: 100vw;
  overflow: hidden;
  opacity: ${(props) => props.opacity};
  transition: 0.5s;
`

export default Page
