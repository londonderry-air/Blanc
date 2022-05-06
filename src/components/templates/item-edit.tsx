import { FitScreenBox } from '../atoms/box/fit-screen'
import { EditBox } from '../molucules/edit-box'
import { useRecoilValue } from 'recoil'
import { editItemState, themeColorState } from '~/states/atoms'
import { Sidebar } from '../elements/sidebar'
import { moduler } from '~/utils/styles'
import {
  AnimateSwitchOverBox,
  AnimateSwitchOverBoxItem
} from '../animation/animate-switch-over-box'
import { NextRouter } from 'next/router'
import { ItemEditHeader } from '../organisms/item-edit-header'
import { ItemEditNav } from '../organisms/item-edit-nav'
import { ItemEditBasic } from '../organisms/item-edit-basic'
import { ItemEditParam } from '../organisms/item-edit-param'

export const ItemEdit = (props: {
  router: NextRouter
  onSaveItem: () => void
  onDeleteItem: () => void
}) => {
  const item = useRecoilValue(editItemState)
  const color = useRecoilValue(themeColorState)

  if (!item) return <></>

  return (
    <EditBox isVisible={true}>
      <ItemEditHeader
        router={props.router}
        onSaveItem={() => props.onSaveItem()}
        onDeleteItem={() => props.onDeleteItem()}
      />
      <Sidebar sidePosition={'left'}  sideWidth="30ch" gap={moduler(6)}>
        <ItemEditNav router={props.router} item={item} />
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
            <AnimateSwitchOverBoxItem childKey={`/item/${item.id}`}>
              <ItemEditBasic />
            </AnimateSwitchOverBoxItem>
            <AnimateSwitchOverBoxItem childKey={`/item/${item.id}/parameter`}>
              <ItemEditParam />
            </AnimateSwitchOverBoxItem>
          </AnimateSwitchOverBox>
        </FitScreenBox>
      </Sidebar>
    </EditBox>
  )
}
