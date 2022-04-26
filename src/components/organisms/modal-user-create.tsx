import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { themeColorState } from '~/states/atoms'
import { moduler } from '~/utils/styles'
import { Button } from '../atoms/button/button'
import { StackText } from '../atoms/text/stack'
import { FlexBox } from '../atoms/box/flex'
import { Box } from '../layout/box'
import { useMemo, useRef } from 'react'
import { ButtonProps } from '$/types/element'
import { _Sentence, _Word } from '../atoms/text/_text'
import { BorderBox } from '../atoms/box/border'
import { Input } from '../molucules/field-input'
import { AlignBox } from '../atoms/box/align'

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

export const UserCreateModal = (props: {
  isVisible: boolean
  onClose: () => void
  onCreate: (data: { name: string; email: string }) => void
}) => {
  const color = useRecoilValue(themeColorState)
  const nameRef = useRef('')
  const emailRef = useRef('')

  return useMemo(
    () => (
      <ModalWrap isVisible={props.isVisible}>
        <ModalBox
          width="80vw"
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
          <AlignBox position={'absolute'} align={'right'}></AlignBox>
          <FlexBox way="row" justifyContent="center" alignItems="center">
            <StackText
              top={'ユーザーの作成'}
              bottom={'CREATE USER'}
              color={color.text}
              isCenter={true}
              size={0}
            />
          </FlexBox>
          <FlexBox
            width={'100%'}
            way={'column'}
            grow={'9999'}
            gap={moduler(1)}
            overflow={{ x: 'hidden', y: 'scroll' }}
            alignItems={'center'}
            justifyContent={'center'}
            padding={'1em 0'}
          >
            <_Sentence size={moduler(-2)} weight={'600'} align={'center'}>
              {
                '新しいユーザーのメールアドレスを入力してください。\nメールアドレスはGmailアドレスのみ利用可能です。'
              }
            </_Sentence>
            <Input
              width={'50ch'}
              padding={'20px 14px'}
              placeholder={'ユーザー名'}
              defaultValue={''}
              onInput={(s) => (nameRef.current = s)}
            />
            <Input
              width={'50ch'}
              padding={'20px 14px'}
              placeholder={'メールアドレス（Gmail）'}
              defaultValue={''}
              onInput={(s) => (emailRef.current = s)}
            />
          </FlexBox>
          <ModalButtonBox
            way="row"
            wrap="nowrap"
            justifyContent="center"
            alignItems="center"
            gap="2em"
          >
            <Button
              title={'作成する'}
              subTitle={'CREATE'}
              width={'20ch'}
              color={color.text}
              isInactive={false}
              isInvisible={false}
              onClick={() =>
                props.onCreate({
                  name: nameRef.current,
                  email: emailRef.current
                })
              }
            />
            <Button
              width={'20ch'}
              title={'閉じる'}
              subTitle={'CLOSE'}
              color={''}
              colors={{
                text: color.text,
                border: color.border,
                background: color.background
              }}
              onClick={() => {
                props.onClose()
              }}
            />
          </ModalButtonBox>
        </ModalBox>
      </ModalWrap>
    ),
    [props.isVisible]
  )
}

export const MessageModal = (props: {
  type: 'caution'
  message: string
  buttons: ButtonProps[]
  isVisible: boolean
}) => {
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
