import { FitScreenBox } from '../atoms/box/fit-screen'
import { EditBox } from '../molucules/edit-box'
import { useRecoilValue } from 'recoil'
import { editBlancUserState, themeColorState } from '~/states/atoms'
import { Sidebar } from '../layout/sidebar'
import { moduler } from '~/utils/styles'
import {
  AnimateSwitchOverBox,
  AnimateSwitchOverBoxItem
} from '../animation/animate-switch-over-box'
import { NextRouter } from 'next/router'
import { ContentEditNav } from '../organisms/content-edit-nav'
import { UserEditHeader } from '../organisms/user-edit-header'
import { UserEditBasic } from '../organisms/user-edit-basic'
import { UserEditNav } from '../organisms/user-edit-nav'

export const UserEdit = (props: {
  router: NextRouter
  onSaveUser: () => void
  onDeleteUser: () => void
}) => {
  const user = useRecoilValue(editBlancUserState)
  const color = useRecoilValue(themeColorState)

  if (!user) {
    return <></>
  }

  return (
    <EditBox isVisible={true}>
      <UserEditHeader
        router={props.router}
        onSave={props.onSaveUser}
        onDelete={props.onDeleteUser}
      />
      <Sidebar sideWidth="30ch" gap={moduler(6)}>
        <UserEditNav router={props.router} />
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
            <AnimateSwitchOverBoxItem childKey={`/user/${user.id}`}>
              <UserEditBasic />
            </AnimateSwitchOverBoxItem>
            <AnimateSwitchOverBoxItem childKey={`/user/${user.id}/authority`}>
              <p></p>
            </AnimateSwitchOverBoxItem>
          </AnimateSwitchOverBox>
        </FitScreenBox>
      </Sidebar>
    </EditBox>
  )
}
