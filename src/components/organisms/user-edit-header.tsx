import { NextRouter } from 'next/router'
import { ButtonProps } from '$/types/element'
import { useState } from 'react'
import { HomeHeader } from '../molucules/home-header'
import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'

export const UserEditHeader = (props: {
  router: NextRouter
  onSave: () => void
  onDelete: () => void
}) => {
  const color = useRecoilValue(themeColorState)
  const [buttons] = useState<ButtonProps[]>([
    {
      title: '削除',
      subTitle: 'DELETE USER',
      color: color.caution,
      onClick: () => props.onDelete()
    },
    {
      title: '保存',
      subTitle: 'SAVE USER',
      color: color.text,
      onClick: () => props.onSave()
    }
  ])

  return <HomeHeader title="編集" subTitle="EDIT ITEM" buttons={buttons} />
}
