import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { themeColorState } from '~/states/atoms'
import { StackText } from '../atoms/text/stack'
import { FlexBox } from '../atoms/box/flex'

export const PostEditSideNav = (props: {
  state: PostEditSideNavType
  onNavigate: (nav: PostEditSideNavType) => void
}) => {
  const color = useRecoilValue(themeColorState)
  const navs: {
    title: string
    subTitle: string
    state: PostEditSideNavType
  }[] = [
    { title: '部品', subTitle: 'COMPONENTS', state: 'component' },
    { title: '設定', subTitle: 'SETTINGS', state: 'settings' },
    { title: 'SEO設定', subTitle: 'SEO', state: 'seo' }
  ]

  return (
    <NavWrap color={color.text}>
      <FlexBox
        way={'row'}
        gap={'0'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        {navs.map((n, i) => (
          <NavItemWrap
            colors={{
              background:
                n.state === props.state ? color.text : color.background
            }}
            key={i}
            onClick={() => {
              props.onNavigate(n.state)
            }}
          >
            <StackText
              top={n.title}
              bottom={n.subTitle}
              color={n.state === props.state ? color.cellText : color.text}
              size={-2}
            />
          </NavItemWrap>
        ))}
      </FlexBox>
    </NavWrap>
  )
}

const NavItemWrap = styled.div<{ colors: { background: string } }>`
  width: 33.3%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8em 0;
  background-color: ${(props) => props.colors.background};
  cursor: pointer;

  &:nth-of-child(2) {
    width: 33.4%;
  }

  &:active {
    > * {
      transform: scale(0.95);
    }
  }

  > * {
    width: 100%;
  }
`

const NavWrap = styled.div<{ color: string }>`
  width: 100%;
  border-top: double 4px ${(props) => props.color};
`

export type PostEditSideNavType = 'component' | 'seo' | 'settings'
