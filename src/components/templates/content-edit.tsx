import { Category, Content, ItemParam } from '@prisma/client'
import { FitScreenBox } from '../atoms/box/fit-screen'
import { EditBox } from '../molucules/edit-box'
import { useRecoilValue } from 'recoil'
import {
  editCategoryState,
  editContentState,
  editItemParamState,
  themeColorState
} from '~/states/atoms'
import { Sidebar } from '../layout/sidebar'
import { moduler } from '~/utils/styles'
import { ContentEditBasic } from '../organisms/content-edit-basic'
import { ContentEditCategory } from '../organisms/content-edit-category'
import {
  AnimateSwitchOverBox,
  AnimateSwitchOverBoxItem
} from '../animation/animate-switch-over-box'
import { ContentEditHeader } from '../organisms/content-edit-header'
import { CategoryEdit } from '../organisms/category-edit'
import { NextRouter } from 'next/router'
import { ItemParamType } from '$/types/item'
import { ItemParamList } from '../organisms/item-param-list'
import { ItemParamEdit } from '../organisms/item-param-edit'
import { ContentEditNav } from '../organisms/content-edit-nav'

export const ContentEdit = (props: {
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
  const color = useRecoilValue(themeColorState)

  if (!content) {
    return <></>
  }

  return (
    <EditBox isVisible={true}>
      <ContentEditHeader
        router={props.router}
        onSaveContent={props.onSaveContent}
        onSaveCategory={props.onSaveCategory}
        onSaveItemParam={props.onSaveItemParam}
        onCreateCategory={props.onCreateCategory}
        onCreateItemParam={props.onCreateItemParam}
        onDeleteItemParam={props.onDeleteItemParam}
      />
      <Sidebar sideWidth="30ch" gap={moduler(6)}>
        <ContentEditNav router={props.router} />
        <FitScreenBox
          borderTop={{
            width: '3px',
            style: 'solid',
            color: color.border
          }}
        >
          <AnimateSwitchOverBox
            childKey={props.router.asPath}
            width={'100%'}
            fade={{ quantity: '10px', duration: 0.3 }}
          >
            <AnimateSwitchOverBoxItem childKey={`/content/${content.id}`}>
              <ContentEditBasic />
            </AnimateSwitchOverBoxItem>
            <AnimateSwitchOverBoxItem
              childKey={`/content/${content.id}/category`}
            >
              <ContentEditCategory />
            </AnimateSwitchOverBoxItem>
            <AnimateSwitchOverBoxItem
              childKey={`/content/${content.id}/category/${
                category ? category.id : ''
              }`}
            >
              <CategoryEdit router={props.router} />
            </AnimateSwitchOverBoxItem>
            <AnimateSwitchOverBoxItem childKey={`/content/${content.id}/item`}>
              <ItemParamList />
            </AnimateSwitchOverBoxItem>
            <AnimateSwitchOverBoxItem
              childKey={`/content/${content.id}/item/${
                itemParam ? itemParam.id : ''
              }`}
            >
              <ItemParamEdit router={props.router} />
            </AnimateSwitchOverBoxItem>
          </AnimateSwitchOverBox>
        </FitScreenBox>
      </Sidebar>
    </EditBox>
  )
}
