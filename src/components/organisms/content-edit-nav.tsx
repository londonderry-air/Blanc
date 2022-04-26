import { NextRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import {
  editCategoryState,
  editContentState,
  editItemParamState
} from '~/states/atoms'
import { EditNav } from '../molucules/edit-nav'

export const ContentEditNav = (props: { router: NextRouter }) => {
  const content = useRecoilValue(editContentState)
  const category = useRecoilValue(editCategoryState)
  const itemParam = useRecoilValue(editItemParamState)

  if (!content) {
    return <></>
  }
  return (
    <EditNav
      navs={[
        {
          title: '基本設定',
          subTitle: 'BASIC SETTINGS',
          isDisplay: props.router.asPath === `/content/${content.id}`,
          href: `/content/${content.id}`
        },
        {
          title: 'カテゴリー機能',
          subTitle: 'CATEGORY FEATURE',
          isDisplay:
            props.router.asPath === `/content/${content.id}/category` ||
            props.router.asPath ===
              `/content/${content.id}/category/${category ? category.id : ''}`,
          href: `/content/${content.id}/category`
        },
        {
          title: 'アイテム機能',
          subTitle: 'ITEM FEATURE',
          isDisplay:
            props.router.asPath === `/content/${content.id}/item` ||
            props.router.asPath ===
              `/content/${content.id}/item/${itemParam ? itemParam.id : ''}`,
          href: `/content/${content.id}/item`
        }
      ]}
    />
  )
}
