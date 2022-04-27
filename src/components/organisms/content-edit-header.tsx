import { ButtonProps } from '$/types/element'
import { NextRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { HomeHeader } from '../molucules/home-header'
import { Category, Content, ItemParam } from '@prisma/client'
import { ItemParamType } from '$/types/item'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  editCategoryState,
  editContentState,
  editItemParamState,
  modalState,
  themeColorState
} from '~/states/atoms'
import { ItemParamSelect } from './item-param-select'

export const ContentEditHeader = (props: {
  router: NextRouter
  onSaveContent: () => void
  onCreateCategory: () => void
  onCreateItemParam: (type: ItemParamType, content: Content) => void
  onSaveCategory: (category: Category, content: Content) => void
  onSaveItemParam: (itemParam: ItemParam, content: Content) => void
  onDeleteItemParam: (itemParam: ItemParam) => void
}) => {
  const content = useRecoilValue(editContentState)
  const category = useRecoilValue(editCategoryState)
  const itemParam = useRecoilValue(editItemParamState)
  const [buttons, setButtons] = useState<ButtonProps[]>([])
  const [rcModal, setModal] = useRecoilState(modalState)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [itemParamType, setItemParamType] = useState<ItemParamType | null>(null)
  const [isNewItemParam, setNewItemParam] = useState(false)
  const color = useRecoilValue(themeColorState)
  const getModalButton = (isActive: boolean): ButtonProps[] => [
    {
      title: '作成する',
      subTitle: 'CREATE',
      color: color.text,
      isInactive: !isActive,
      onClick: () => {
        setNewItemParam(!isNewItemParam)
        setModal({ title: rcModal.title, isVisible: false })
      }
    }
  ]
  useEffect(() => {
    if (itemParamType && content) {
      props.onCreateItemParam(itemParamType, content)
    }
  }, [isNewItemParam])

  useEffect(() => {
    if (!itemParamType) return
    setModal({
      title: 'パラメータを作成する',
      subTitle: 'Create New Item Parameter',
      isVisible: true,
      buttons: getModalButton(itemParamType !== null),
      children: (
        <ItemParamSelect
          onClick={(type) => {
            console.log(type)
            console.log(itemParamType)
            setItemParamType(type)
          }}
        />
      )
    })
  }, [itemParamType])

  useEffect(() => {
    if (!content) return
    switch (props.router.asPath) {
      case `/content/${content.id}`:
        setButtons([
          {
            title: 'コンテンツを保存',
            subTitle: 'SAVE CONTENT',
            color: color.text,
            onClick: () => props.onSaveContent()
          }
        ])
        break
      case `/content/${content.id}/category`:
        setButtons([
          {
            title: 'カテゴリーを作成',
            subTitle: 'NEW CATEGORY',
            color: color.text,
            onClick: () => props.onCreateCategory()
          }
        ])
        break
      case `/content/${content.id}/category/${category ? category.id : ''}`:
        setButtons([
          {
            title: 'カテゴリーを保存',
            subTitle: 'SAVE CATEGORY',
            color: color.text,
            onClick: () => {
              if (category) props.onSaveCategory(category, content)
            }
          }
        ])
        break
      case `/content/${content.id}/item`:
        setButtons([
          {
            title: 'パラメータを作成',
            subTitle: 'NEW ITEM PARAM',
            color: color.text,
            onClick: () =>
              setModal({
                title: 'パラメータを作成する',
                subTitle: 'Create New Item Parameter',
                isVisible: true,
                buttons: getModalButton(itemParamType !== null),
                children: (
                  <ItemParamSelect
                    onClick={(type) => {
                      console.log(type)
                      console.log(itemParamType)
                      setItemParamType(type)
                    }}
                  />
                )
              })
          }
        ])
        break
      case `/content/${content.id}/item/${itemParam ? itemParam.id : ''}`:
        setButtons([
          {
            title: '削除',
            subTitle: 'DELETE ITEM PARAM',
            color: color.caution,
            onClick: () => {
              if (itemParam) props.onDeleteItemParam(itemParam)
              props.router.push(`/content/${content.id}/item`)
            }
          },
          {
            title: 'パラメータを保存',
            subTitle: 'SAVE ITEM PARAM',
            color: color.text,
            onClick: () => {
              if (itemParam) props.onSaveItemParam(itemParam, content)
            }
          }
        ])
        break
    }
  }, [props.router.asPath])
  return <HomeHeader title="編集" subTitle="EDIT CONTENT" buttons={buttons} />
}
