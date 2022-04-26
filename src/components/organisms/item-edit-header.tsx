import { ButtonProps } from '$/types/element'
import { NextRouter } from 'next/router'
import { useState } from 'react'
import { HomeHeader } from '../molucules/home-header'
import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'

export const ItemEditHeader = (props: {
  router: NextRouter
  onSaveItem: () => void
  onDeleteItem: () => void
}) => {
  const color = useRecoilValue(themeColorState)
  const [buttons] = useState<ButtonProps[]>([
    {
      title: '削除',
      subTitle: 'DELETE ITEM',
      color: color.caution,
      onClick: () => props.onDeleteItem()
    },
    {
      title: '保存',
      subTitle: 'SAVE ITEM',
      color: color.text,
      onClick: () => props.onSaveItem()
    }
  ])

  return <HomeHeader title="編集" subTitle="EDIT ITEM" buttons={buttons} />
}
