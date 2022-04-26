import { useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { modalState, themeColorState } from '~/states/atoms'
import { moduler } from '~/utils/styles'
import { Button } from '../atoms/button/button'
import { StackText } from '../atoms/text/stack'
import { FlexBox } from '../atoms/box/flex'
import { Box } from '../layout/box'
import { useMemo } from 'react'
import { ButtonProps } from '$/types/element'
import useWindowSize from '~/hooks/useWindowSize'
import { _Sentence, _Word } from '../atoms/text/_text'
import { BorderBox } from '../atoms/box/border'

const ModalWrap = styled.div<{
  isVisible: boolean
}>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  pointer-events: ${(props) => (props.isVisible ? 'all' : 'none')};
  padding: 6vh 16vw;
  background: #000000cc;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ModalBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: space-between;
`

const ModalTitleBox = styled.div<{ color: string }>`
  margin-right: auto;
  padding: 0 ${moduler(-3)};
  border-right: solid 0px ${(props) => props.color};
  border-left: solid 6px ${(props) => props.color};
`

const ModalChildrenBox = styled.div`
  position: relative;
  flex-grow: 9999;
  padding: 1em 0;
  overflow-x: hidden;
  overflow-y: scroll;
`

const ModalMessageBox = styled.div`
  position: relative;
  flex-grow: 9999;
  padding: 1em 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ModalButtonBox = styled(FlexBox)`
  width: 100%;
`

export const Modal = () => {
  const winsize = { width: '100vw', height: '100vh' }
  const color = useRecoilValue(themeColorState)
  const [rcModal, setRcModal] = useRecoilState(modalState)

  return useMemo(
    () => (
      <ModalWrap isVisible={rcModal.isVisible}>
        <ModalBox
          height="100%"
          background={color.background}
          backdropFilter={'blur(8px)'}
          padding={`${moduler(8)} ${moduler(8)} 1em ${moduler(8)}`}
          border={{
            width: '8px',
            color: color.border,
            style: 'double',
            radius: '9px'
          }}
        >
          <FlexBox way="row" justifyContent="space-between" alignItems="center">
            <ModalTitleBox color={color.border}>
              <StackText
                top={rcModal.title ?? ''}
                bottom={rcModal.subTitle}
                color={color.text}
                isCenter={false}
                size={0}
              />
            </ModalTitleBox>
            <Button
              title={'閉じる'}
              subTitle={'CLOSE'}
              color={''}
              colors={{
                text: color.text,
                border: color.border,
                background: color.background
              }}
              onClick={() => {
                if (rcModal.onClose) rcModal.onClose()
                setRcModal({
                  title: rcModal.title,
                  isVisible: false
                })
              }}
            />
          </FlexBox>
          <ModalChildrenBox>{rcModal.children}</ModalChildrenBox>
          <ModalButtonBox
            way="row"
            wrap="nowrap"
            justifyContent="center"
            alignItems="center"
            gap="2em"
          >
            {(rcModal.buttons ?? []).map((btn, i) => (
              <Button
                key={i}
                title={btn.title}
                subTitle={btn.subTitle}
                width={btn.width}
                color={btn.color}
                colors={btn.colors}
                isInactive={btn.isInactive}
                isInvisible={btn.isInvisible}
                onClick={btn.onClick}
              />
            ))}
          </ModalButtonBox>
        </ModalBox>
      </ModalWrap>
    ),
    [rcModal]
  )
}

export const MessageModal = (props: {
  type: 'caution'
  message: string
  buttons: ButtonProps[]
  isVisible: boolean
}) => {
  const winsize = { width: '100vw', height: '100vh' }
  const color = useRecoilValue(themeColorState)
  return (
    <ModalWrap isVisible={props.isVisible}>
      <ModalBox
        background={color.background}
        backdropFilter={'blur(8px)'}
        padding={`${moduler(8)} ${moduler(8)} 1em ${moduler(8)}`}
        border={{
          width: '8px',
          color: color.border,
          style: 'double',
          radius: '9px'
        }}
      >
        <FlexBox
          width={'60vw'}
          way={'column'}
          alignItems={'center'}
          gap={'2em'}
          justifyContent="space-between"
        >
          <BorderBox
            borderPosition={'bottom'}
            borderColor={color.text}
            borderWidth={'4px'}
            borderStyle={'solid'}
            padding={'0 0 4px 0'}
          >
            <_Word weight={'600'} size={moduler(4)}>
              {props.type.toUpperCase()}
            </_Word>
          </BorderBox>
          <ModalMessageBox>
            <_Sentence weight={'600'} size={moduler(-1)} align="center">
              {props.message}
            </_Sentence>
          </ModalMessageBox>
          <ModalButtonBox
            way="row"
            wrap="nowrap"
            justifyContent="center"
            alignItems="center"
            gap="2em"
          >
            {(props.buttons ?? []).map((btn, i) => (
              <Button
                key={i}
                title={btn.title}
                subTitle={btn.subTitle}
                width={btn.width}
                color={btn.color}
                colors={btn.colors}
                isInactive={btn.isInactive}
                isInvisible={btn.isInvisible}
                onClick={btn.onClick}
              />
            ))}
          </ModalButtonBox>
        </FlexBox>
      </ModalBox>
    </ModalWrap>
  )
}
