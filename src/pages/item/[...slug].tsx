import { Item } from '$/node_modules/.prisma/client'
import { ItemWithRelation } from '$/types/item'
import useAspidaSWR from '@aspida/swr'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { AnimateFadeVisibleBox } from '~/components/animation/animate-fade-visible-box'
import { Box } from '~/components/atoms/box/box'
import { MessageModal } from '~/components/molucules/modal'
import { ItemEdit } from '~/components/templates/item-edit'
import { deleteFileList, editItemState, themeColorState } from '~/states/atoms'
import { apiClient } from '~/utils/apiClient'

export const Page = () => {
  const router = useRouter()
  const color = useRecoilValue(themeColorState)
  const [editItem, setEditItem] = useRecoilState(editItemState)
  const [deletes, setDeleteFiles] = useRecoilState(deleteFileList)
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false)
  const editItemRef = useRef<ItemWithRelation | null>(null)
  const deleteList = useRef<string[]>([])
  const { slug } = router.query

  const { data: item } = useAspidaSWR(apiClient.v1.item.id, {
    query: { id: slug ? slug[0] : '' }
  })

  const isTargetCollect = (item: ItemWithRelation | null) => {
    const id = router.asPath.split('/')[2]
    return item === null ? false : item.id === id
  }

  const onDelete = async (item: Item) => {
    if (!item) return
    const res = await apiClient.v1.item.id.delete({ query: { id: item.id } })
    if (res.body.status === 'success') {
      router.push('/item')
    }
  }

  const onSave = async () => {
    if (!editItemRef.current) return
    await apiClient.v1.item.id.put({ body: editItemRef.current })
    await apiClient.v1.storage.delete({
      body: deleteList.current
    })
    // mutateItem()
    console.log(editItemRef.current)
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
    if (item) {
      setEditItem(item)
    }
  }, [item])

  useEffect(() => {
    // recoilの内容が onSave にて反映されないため、useRefに保存してから参照する
    editItemRef.current = editItem
    console.log(editItem)
  }, [editItem])

  return (
    <Box width={'100%'}>
      <AnimateFadeVisibleBox
        isVisible={!!editItem && isTargetCollect(editItem)}
        translation={{ from: 'bottom', quantity: '10px', duration: '0.5s' }}
      >
        <ItemEdit
          router={router}
          onSaveItem={() => onSave()}
          onDeleteItem={() => setDeleteModalVisible(true)}
        />
      </AnimateFadeVisibleBox>
      <MessageModal
        type={'caution'}
        message={`このアイテムを削除してもよろしいですか？\n削除されたアイテムは復元することができません。`}
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
              if (item) onDelete(item)
            }
          }
        ]}
      />
    </Box>
  )
}

export default Page
