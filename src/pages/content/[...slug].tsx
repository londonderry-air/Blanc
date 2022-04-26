import { Category, ItemParam } from '$/node_modules/@prisma/client'
import { ContentWithRelation } from '$/types/content'
import { ItemParamType } from '$/types/item'
import useAspidaSWR from '@aspida/swr'
import { NextRouter, useRouter } from 'next/router'
import { useCallback, useEffect, useRef } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { AnimateFadeVisibleBox } from '~/components/animation/animate-fade-visible-box'
import { Box } from '~/components/atoms/box/box'
import { ContentEdit } from '~/components/templates/content-edit'
import {
  editCategoryState,
  editContentState,
  editItemParamState,
  notifierState
} from '~/states/atoms'
import { apiClient } from '~/utils/apiClient'
import { randomStr } from '~/utils/variable'

export const Page = () => {
  const router = useRouter()
  const setNotifier = useSetRecoilState(notifierState)
  const [editContent, setEditContent] = useRecoilState(editContentState)
  const [editCategory, setEditCategory] = useRecoilState(editCategoryState)
  const [editItemParam, setEditItemParam] = useRecoilState(editItemParamState)
  const contentRef = useRef<ContentWithRelation | null>(null)
  const categoryRef = useRef<Category | null>(null)
  const itemParamRef = useRef<ItemParam | null>(null)
  const { slug } = router.query

  const { data: content, mutate: mutate } = useAspidaSWR(
    apiClient.v1.content.id,
    {
      query: { id: slug ? slug[0] : '' }
    }
  )

  const onSaveContent = useCallback(async () => {
    if (!contentRef.current) return
    const res = await apiClient.v1.content.id.put({
      body: contentRef.current
    })
    console.log(res)
    if (res.body.status === 'failed') {
      setNotifier({
        state: 'caution',
        message: {
          main: res.body.exception ? res.body.exception.content.jp : '',
          sub: res.body.exception ? res.body.exception.solution.jp : ''
        }
      })
    }

    if (res.body.status === 'success') {
      setNotifier({
        state: 'success',
        message: {
          main: 'コンテンツを保存しました'
        }
      })
    }

    mutate()
  }, [])

  const onCreateCategory = useCallback(async () => {
    if (!contentRef.current) return
    await apiClient.v1.category.post({
      body: {
        contentId: contentRef.current.id,
        name: randomStr()
      }
    })
    mutate()
  }, [])

  const onSaveCategory = useCallback(async () => {
    if (!categoryRef.current) return
    await apiClient.v1.category.put({
      body: categoryRef.current
    })
    mutate()
  }, [])

  const onCreateItemParam = useCallback(async (type: ItemParamType) => {
    if (!contentRef.current) return
    await apiClient.v1.item.param.post({
      body: {
        type: type,
        contentId: contentRef.current.id
      }
    })
    mutate()
  }, [])

  const onSaveItemParam = useCallback(async () => {
    if (!itemParamRef.current) return
    await apiClient.v1.item.param.put({
      body: itemParamRef.current
    })
    mutate()
  }, [])

  const onDeleteItemParam = useCallback(async () => {
    if (!itemParamRef.current) return
    await apiClient.v1.item.param.delete({ body: itemParamRef.current.id })
    mutate()
  }, [])

  const isTargetCollect = (content: ContentWithRelation | null) => {
    const id = router.asPath.split('/')[2]
    return content === null ? false : content.id === id
  }

  useEffect(() => {
    if (content) {
      setEditContent(content)
      setEditCategory(getInitCategory(router, content.categories))
      setEditItemParam(getInitItemParam(router, content.itemParams))
    }
  }, [content])

  useEffect(() => {
    contentRef.current = editContent
  }, [editContent])

  useEffect(() => {
    categoryRef.current = editCategory
  }, [editCategory])

  useEffect(() => {
    itemParamRef.current = editItemParam
  }, [editItemParam])

  useEffect(() => {
    mutate()
  }, [router.asPath])

  console.log(content)

  return (
    <Box width={'100%'}>
      <AnimateFadeVisibleBox
        isVisible={!!content && isTargetCollect(editContent)}
        translation={{ from: 'bottom', quantity: '10px', duration: '0.5s' }}
      >
        <ContentEdit
          router={router}
          onSaveContent={onSaveContent}
          onCreateCategory={onCreateCategory}
          onCreateItemParam={onCreateItemParam}
          onSaveCategory={onSaveCategory}
          onSaveItemParam={onSaveItemParam}
          onDeleteItemParam={onDeleteItemParam}
        />
      </AnimateFadeVisibleBox>
    </Box>
  )
}

export default Page

const getInitCategory = (router: NextRouter, categories: Category[]) => {
  const params = router.asPath.split('/')
  const isCategoryEditPage =
    params.includes('category') &&
    params.indexOf('category') === params.length - 2
  if (!isCategoryEditPage) return categories[0]
  const isCategoryExists = categories.some(
    (category) => category.id === params[params.length - 1]
  )
  return isCategoryExists
    ? categories.filter(
        (category) => category.id === params[params.length - 1]
      )[0]
    : categories[0]
}

const getInitItemParam = (router: NextRouter, itemParams: ItemParam[]) => {
  const params = router.asPath.split('/')
  const isItemParamEditPage =
    params.includes('item') && params.indexOf('item') === params.length - 2
  if (!isItemParamEditPage) return itemParams[0]
  const isItemParamExists = itemParams.some(
    (itemParam) => itemParam.id === params[params.length - 1]
  )
  return isItemParamExists
    ? itemParams.filter(
        (itemParam) => itemParam.id === params[params.length - 1]
      )[0]
    : itemParams[0]
}
