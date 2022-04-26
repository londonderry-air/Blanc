import { Cluster } from '~/components/layout/cluster'
import { AppHeaderLink } from '../molucules/app-header-link'
import { Image } from '~/components/atoms/image/image'
import { moduler } from '~/utils/styles'
import styled from 'styled-components'
import { color } from '~/utils/variable'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { FlexBox } from '../atoms/box/flex'
import { UserHeader } from './user-header'

const Wrap = styled.div<{ isDisplay: boolean }>`
  width: 100%;
  transform: translateY(${(props) => (props.isDisplay ? '0%' : '-100%')});
  border-bottom: solid 1px ${color.gray};
  z-index: 10;
`

export const AppHeader = (props: HomeHeaderProps) => {
  const session = useSession()
  const displayPath = props.displayPath
  const [isDisplay, setDisplayState] = useState(true)
  const linkInfos = [
    { title: '投稿', subTitle: 'POST', targetPath: '/post' },
    { title: 'コンテンツ', subTitle: 'CONTENT', targetPath: '/content' },
    { title: 'アイテム', subTitle: 'ITEM', targetPath: '/item' },
    { title: 'ユーザー', subTitle: 'USER', targetPath: '/user' },
    { title: '設定', subTitle: 'SETTINGS', targetPath: '/settings' }
  ]
  const hiddenURL = [
    '/welcome',
    '/onbording',
    '/hello',
    '/authenticate',
    '/authenticate/unregistered',
    '/post/edit/[id]'
  ]

  useEffect(() => {
    if (props.displayPath === '/post/edit/[id]') {
      setDisplayState(false)
    } else {
      setDisplayState(true)
    }
  }, [props.displayPath])

  if (hiddenURL.includes(props.displayPath)) {
    return <></>
  }

  if (session.status === 'unauthenticated') {
    //return <></>
  }

  if (!session.data) {
    //return <></>
  }

  // const user = session.data.user

  // if (!user.isBlancUser || user.isFirstLogin) {
  //return <></>
  // }

  return (
    <Wrap isDisplay={isDisplay}>
      <FlexBox
        padding={`${moduler(-1)} ${moduler(10)}`}
        way={'row'}
        alignItems="center"
        justifyContent="space-between"
        gap={'4em'}
        zIndex={'99'}
      >
        <Image src={'/blanc.png'} width={'3em'} height={'3em'} fit={'cover'} />
        <FlexBox way={'row'} grow={'9999'}>
          <Cluster alignItem="center" gap={moduler(-1)}>
            {linkInfos.map((linkInfo) => (
              <AppHeaderLink
                key={linkInfo.targetPath}
                title={linkInfo.title}
                subTitle={linkInfo.subTitle}
                href={linkInfo.targetPath}
                isDisplaying={displayPath.indexOf(linkInfo.targetPath) !== -1}
              ></AppHeaderLink>
            ))}
          </Cluster>
        </FlexBox>
        <UserHeader />
      </FlexBox>
    </Wrap>
  )
}

type HomeHeaderProps = {
  displayPath: string
}
