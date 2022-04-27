import { Item } from '@prisma/client'
import { NextRouter } from 'next/router'
import { EditNav } from '../molucules/edit-nav'

export const ItemEditNav = (props: { router: NextRouter; item: Item }) => {
  return (
    <EditNav
      navs={[
        {
          title: '基本設定',
          subTitle: 'BASIC SETTINGS',
          isDisplay: props.router.asPath === `/item/${props.item.id}`,
          href: `/item/${props.item.id}`
        },
        {
          title: 'パラメータ',
          subTitle: 'PARAMETER',
          isDisplay: props.router.asPath === `/item/${props.item.id}/parameter`,
          href: `/item/${props.item.id}/parameter`
        }
      ]}
    />
  )
}
