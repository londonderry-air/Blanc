import { Item, BlancUser } from '@prisma/client'
import { ItemWithRelation } from '$/types/item'
import { BlancUserWithRelation } from '$/types/user'
import useAspidaSWR from '@aspida/swr'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { FadeBox } from '~/components/atoms/box/fade'
import { MessageModal } from '~/components/molucules/modal'
import { ItemEdit } from '~/components/templates/item-edit'
import { UserEdit } from '~/components/templates/user-edit'
import { deleteFileList, editItemState, themeColorState } from '~/states/atoms'
import { apiClient } from '~/utils/apiClient'
import { editBlancUserState } from '~/states/atoms'
import { Box } from '~/components/atoms/box/box'

export const Page = () => {
  const router = useRouter()
  const color = useRecoilValue(themeColorState)
  const [editUser, setEditUser] = useRecoilState(editBlancUserState)
  const [deletes, setDeleteFiles] = useRecoilState(deleteFileList)
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false)
  const editUserRef = useRef<BlancUserWithRelation | null>(null)
  const deleteList = useRef<string[]>([])
  const { slug } = router.query

  const { data: user, mutate: mutate } = useAspidaSWR(apiClient.v1.admin.user, {
    query: { id: slug ? slug[0] : '' }
  })

  const isTargetCollect = (user: BlancUserWithRelation | null) => {
    const id = router.asPath.split('/')[2]
    return user === null ? false : user.id === id
  }

  const onDelete = async (user: BlancUser) => {
    if (!user) return
    const res = await apiClient.v1.admin.user.delete({ query: { id: user.id } })
    if (res.body.status === 'success') {
      router.push('/user')
    }
  }

  const onSave = async () => {
    if (!editUserRef.current) return
    await apiClient.v1.admin.user.post({ body: editUserRef.current })
    await apiClient.v1.storage.delete({
      body: deleteList.current
    })
    mutate()
    console.log(editUserRef.current)
  }

  useEffect(() => {
    // recoilの内容が onSave にて反映されないため、useRefに保存してから参照する
    deleteList.current = deletes
  }, [deletes])

  useEffect(() => {
    // initialize delete files and editing item
    setDeleteFiles([])
  }, [])

  useEffect(() => {
    if (user) {
      setEditUser(user)
    }
  }, [user])

  useEffect(() => {
    // recoilの内容が onSave にて反映されないため、useRefに保存してから参照する
    editUserRef.current = editUser
    console.log(editUser)
  }, [editUser])

  return (
    <Box width={'100%'}>
      <FadeBox
        status={!!editUser && isTargetCollect(editUser)}
        translation={{ from: 'bottom', quantity: '10px', duration: '0.5s' }}
      >
        <UserEdit
          router={router}
          onSaveUser={() => onSave()}
          onDeleteUser={() => setDeleteModalVisible(true)}
        />
      </FadeBox>
      <MessageModal
        type={'caution'}
        message={`このユーザーを削除してもよろしいですか？\n削除されたユーザーは復元することができません。\nまた、このユーザーに関する履歴も全て削除されます。`}
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
            onClick: () => {
              if (user) onDelete(user)
            }
          }
        ]}
      />
    </Box>
  )
}

export default Page
function editUserState(editUserState: any): [any, any] {
  throw new Error('Function not implemented.')
}
