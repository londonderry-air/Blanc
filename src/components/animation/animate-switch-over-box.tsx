/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { FlexBox } from '~/components/atoms/box/flex'

const AnimateSwitchOverFlexBox = styled(FlexBox)<{ width: string }>`
  width: ${(props) => props.width};
  overflow-x: hidden;
  overflow-y: scroll;
  position: relative;
`

const AnimateSwitchOverChildWrap = styled.div<{
  width: string
  pos: number
  fade: {
    quantity: string
    duration: number
  }
  isVisible: boolean
}>`
  width: ${(props) => props.width};
  height: ${(props) => (props.isVisible ? '100%' : '0px')};
  overflow-y: scroll;
  ${(props) =>
    `transform: translateX(calc(100% * (-${props.pos}))) translateY(${
      props.isVisible ? '0px' : props.fade.quantity
    });`}
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  pointer-events: ${(props) => (props.isVisible ? 'all' : 'none')};
  transition: ${(props) => props.fade.duration}s,
    ${(props) => props.fade.duration}s, 0s;
  transition-delay: ${(props) =>
      props.isVisible ? props.fade.duration + 0.2 : 0}s,
    ${(props) => (props.isVisible ? props.fade.duration + 0.2 : 0)}s,
    ${(props) => (props.isVisible ? 0 : props.fade.duration + 0.1)}s;
  transition-property: transform, opacity, height;
  flex-shrink: 0;
`
export const _AnimateSwitchOverBoxItem = styled.div<{ childKey: string }>`
  width: 100%;
  flex-shrink: 0;
`

export const AnimateSwitchOverBoxItem = (props: {
  childKey: string
  children: React.ReactNode
}) => {
  return (
    <_AnimateSwitchOverBoxItem childKey={props.childKey}>
      {props.children}
    </_AnimateSwitchOverBoxItem>
  )
}

export const AnimateSwitchOverBox = (props: {
  children: React.ReactElement<typeof AnimateSwitchOverBoxItem>[]
  childKey: string
  width: string
  fade: {
    quantity: string
    duration: number
  }
}) => {
  const [childWidth, setChildWidth] = useState('100%')
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>
  const childArray = React.Children.toArray(props.children)

  useEffect(() => {
    if (ref.current) {
      setChildWidth(`${ref.current.getBoundingClientRect().width}px`)
    }
  }, [ref.current])

  return (
    <AnimateSwitchOverFlexBox
      width={props.width}
      way={'row'}
      alignItems={'flex-start'}
      gap={'0'}
      grow={'9999'}
      ref={ref}
    >
      {childArray.map((child: any, i) => (
        <AnimateSwitchOverChildWrap
          width={childWidth}
          key={i}
          pos={i}
          fade={props.fade}
          isVisible={props.childKey === child.props.childKey}
        >
          {child}
        </AnimateSwitchOverChildWrap>
      ))}
    </AnimateSwitchOverFlexBox>
  )
}
