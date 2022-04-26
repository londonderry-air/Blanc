import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { notifierState, themeColorState } from '~/states/atoms'
import { moduler } from '~/utils/styles'
import { FlexBox } from '../atoms/box/flex'
import { _Word, _Sentence } from '../atoms/text/_text'
import { Box } from '../atoms/box/box'

export const Notifier = () => {
  const color = useRecoilValue(themeColorState)
  const notifier = useRecoilValue(notifierState)
  const [isVisible, setVisible] = useState(false)
  const getStateColor = (state: NotifierState) => {
    switch (state) {
      case 'success':
        return {
          background: color.active,
          border: color.active,
          text: color.cellText
        }
      case 'caution':
        return {
          background: color.caution,
          border: color.caution,
          text: color.cellText
        }
      case 'warning':
        return {
          background: color.warning,
          border: color.warning,
          text: color.cellText
        }
      case 'message':
        return {
          background: color.background,
          border: color.border,
          text: color.text
        }
      default:
        return {
          background: color.background,
          border: color.border,
          text: color.text
        }
    }
  }
  const stateColor = getStateColor(notifier ? notifier.state : 'message')

  useEffect(() => {
    if (notifier) {
      setVisible(true)
      setTimeout(() => {
        setVisible(false)
      }, 4000)
    }
  }, [notifier])

  return (
    <NotifierWrap
      backgroundColor={color.background}
      borderColor={stateColor.border}
      isVisible={isVisible}
    >
      <NotifierContainer
        backgroundColor={color.background}
        borderColor={color.background}
      >
        <FlexBox width={'100%'} way={'column'} gap={'6px'}>
          <FlexBox way={'row'} width={'80%'} alignItems={'center'}>
            <_Word weight={'700'} size={moduler(-2)} color={color.text}>
              {notifier ? notifier.message.main : ''}
            </_Word>
          </FlexBox>
          {notifier?.message.sub && (
            <Box width={'100%'}>
              <_Sentence
                weight={'500'}
                size={moduler(-5)}
                color={color.inactive}
                v_space={'1.6em'}
              >
                {notifier ? notifier.message.sub : ''}
              </_Sentence>
            </Box>
          )}
        </FlexBox>
      </NotifierContainer>
    </NotifierWrap>
  )
}

const NotifierWrap = styled.div<{
  backgroundColor: string
  borderColor: string
  isVisible: boolean
}>`
  position: fixed;
  bottom: 5vh;
  right: 3vw;
  width: 40ch;
  min-height: 4em;
  border-left-color: ${(props) => props.borderColor};
  background-color: ${(props) => props.backgroundColor};
  border-left-width: 10px;
  border-left-style: solid;
  display: flex;
  align-items: center;
  box-shadow: 15px 15px 28px -8px rgba(0, 0, 0, 0.6);
  transition: border-color 0s background-color 0s color 0s;
  animation-duration: 0.5s;
  animation-name: ${(props) => (props.isVisible ? 'fadein' : 'fadeout')};
  animation-fill-mode: forwards;
  z-index: 9999;
  pointer-events: ${(props) => (props.isVisible ? 'all' : 'none')};

  @keyframes fadein {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  @keyframes fadeout {
    0% {
      opacity: 1;
      transform: translateY(0px);
    }
    100% {
      opacity: 0;
      transform: translateY(10px);
    }
  }
`

const NotifierContainer = styled.div<{
  backgroundColor: string
  borderColor: string
}>`
  width: 100%;
  bottom: 5vh;
  right: 5vw;
  padding: 18px 4px;
  border-color: ${(props) => props.borderColor};
  border-width: 2px;
  border-style: solid;
  border-radius: 4px;
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  align-items: center;
`

export type NotifierState = 'success' | 'caution' | 'warning' | 'message'
