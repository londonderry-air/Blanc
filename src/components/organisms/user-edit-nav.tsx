import { NextRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import { editBlancUserState } from '~/states/atoms'
import { EditNav } from '../molucules/edit-nav'

export const UserEditNav = (props: { router: NextRouter }) => {
  const user = useRecoilValue(editBlancUserState)

  if (!user) {
    return <></>
  }
  return (
    <EditNav
      navs={[
        {
          title: '基本設定',
          subTitle: 'BASIC SETTINGS',
          isDisplay: props.router.asPath === `/user/${user.id}`,
          href: `/user/${user.id}`
        }
      ]}
    />
  )
}
