import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import { FadeBox} from '../atoms/box/fade'
import { Box } from '../atoms/box/box'
import { AlignBox } from '../atoms/box/align'
import { Image } from '../atoms/image/image'
import { FlexBox } from '../atoms/box/flex'
import { ShadowBox } from '../atoms/box/shadow'
import { themeColorState } from '~/states/atoms'
import { useRecoilValue } from 'recoil'
import { _Word } from '../atoms/text/_text'
import { HoverBorderBox } from '../atoms/box/border'
import { StackText } from '../atoms/text/stack'
import { moduler } from '~/utils/styles'
import { apiClient } from '~/utils/apiClient'

export const UserHeader = () => {
  const { data: session, status: state } = useSession()
  const [isMenuVisible, setMenuVisible] = useState(false)
  const color = useRecoilValue(themeColorState)

  if (state === 'loading' || state === 'unauthenticated') {
    return <></>
  }

  if (session === null) {
    return <></>
  }

  const navs = [
    {
      title: 'プロフィール設定',
      subTitle: 'PROFILE SETTING',
      onSelect: () => console.log('profile')
    },
    {
      title: 'ログアウト',
      subTitle: 'LOG OUT',
      onSelect: () => {
        // refresh Online Status
        apiClient.v1.admin.user
          .post({
            body: {
              email: session.user.email,
              isOnline: false,
              lastLogin: new Date()
            }
          })
          .then(() => signOut())
      }
    }
  ]

  return (
    <Box position={'relative'} zIndex={'100'}>
      <Image
        width={'40px'}
        height={'40px'}
        radius={'20px'}
        fit={'cover'}
        cursor={'pointer'}
        src={session.user.blancImage}
        onClick={() => setMenuVisible(!isMenuVisible)}
      />
      <AlignBox
        position={'absolute'}
        align={'right'}
        zIndex={'101'}
        pointerEvents={isMenuVisible ? 'all' : 'none'}
      >
        <FadeBox
          status={isMenuVisible}
          translation={{
            from: 'bottom',
            quantity: '10px',
            duration: '0.3s'
          }}
        >
          <ShadowBox
            width={'300px'}
            padding={'30px 20px'}
            background={color.background}
            radius={'8px'}
            shadow={'15px 15px 28px -8px rgba(0, 0, 0, 0.6)'}
          >
            <FlexBox way={'column'} gap={'2em'}>
              <FlexBox way={'column'}>
                <_Word color={color.text} weight={'600'} size={moduler(0)}>
                  {session.user.blancName}
                </_Word>
                <_Word
                  color={color.lightInactive}
                  weight={'600'}
                  size={moduler(-3)}
                >{`@${session.user.blancId}`}</_Word>
              </FlexBox>
              <FlexBox way={'column'} gap={'8px'}>
                {navs.map((nav, i) => (
                  <UserHeaderMenuItem
                    key={i}
                    title={nav.title}
                    subTitle={nav.subTitle}
                    onSelect={nav.onSelect}
                  />
                ))}
              </FlexBox>
            </FlexBox>
          </ShadowBox>
        </FadeBox>
      </AlignBox>
    </Box>
  )
}

const UserHeaderMenuItem = (props: {
  title: string
  subTitle?: string
  onSelect: () => void
}) => {
  const color = useRecoilValue(themeColorState)
  return (
    <HoverBorderBox
      padding={'0em 0.75em'}
      unhover = {{
        width: '0.25em'
      }}
      hover = {{
        width: '0.4em'
      }}
      color={color.border}
      onClick={() => props.onSelect()}
    >
      <Box width="fit-content">
        <StackText
          top={props.title}
          bottom={props.subTitle}
          color={color.text}
          isCenter={false}
          size={-2}
        />
      </Box>
    </HoverBorderBox>
  )
}
