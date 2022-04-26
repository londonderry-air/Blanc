import { _ElementArea } from './_element-area'
import { _ElementInput } from './_element-input'
import {
  _MainH,
  _LargeH,
  _MidH,
  _SmallH,
  _Sentence,
  _Word
} from '~/components/atoms/text/_text'
import { Box } from '~/components/atoms/box/box'

export const BlancElementText = (props: {
  data: BlancTextElementProps
  font: {
    size: string
    weight: string
  }
  align?: 'left' | 'center' | 'right'
  width?: string
  background?: string
  color?: string
  padding?: string
  placeholder?: string
  v_space?: string
  h_space?: string
  markup: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  isOneLine?: boolean
}) => {
  if (!props.data.text) {
    props.data.text = ''
  }
  return process.env.NEXT_PUBLIC_BLANC_ISADMIN ? (
    props.isOneLine ? (
      <_ElementInput
        width={props.width}
        height={'auto'}
        color={props.color}
        background={props.background}
        padding={props.padding}
        align={props.align}
        font={props.font}
        v_space={props.v_space}
        h_space={props.h_space}
        placeholder={props.placeholder}
        defaultValue={props.data.text}
        onInput={(s) => (props.data.text = s)}
      />
    ) : (
      <_ElementArea
        width={props.width}
        height={'auto'}
        color={props.color}
        background={props.background}
        padding={props.padding}
        align={props.align}
        font={props.font}
        v_space={props.v_space}
        h_space={props.h_space}
        placeholder={props.placeholder}
        defaultValue={props.data.text}
        onInput={(s) => (props.data.text = s)}
      />
    )
  ) : (
    <Box
      width={props.width}
      height={'auto'}
      background={props.background}
      padding={props.padding}
    >
      {props.markup === 'h1' && (
        <_MainH
          size={props.font ? props.font.size : '1em'}
          weight={props.font ? props.font.weight : '400'}
          color={props.color}
          align={props.align}
          v_space={props.v_space}
          h_space={props.h_space}
        >
          {props.data.text}
        </_MainH>
      )}
      {props.markup === 'h2' && (
        <_LargeH
          size={props.font ? props.font.size : '1em'}
          weight={props.font ? props.font.weight : '400'}
          color={props.color}
          align={props.align}
          v_space={props.v_space}
          h_space={props.h_space}
        >
          {props.data.text}
        </_LargeH>
      )}
      {props.markup === 'h3' && (
        <_MidH
          size={props.font ? props.font.size : '1em'}
          weight={props.font ? props.font.weight : '400'}
          color={props.color}
          align={props.align}
          v_space={props.v_space}
          h_space={props.h_space}
        >
          {props.data.text}
        </_MidH>
      )}
      {props.markup === 'h4' && (
        <_SmallH
          size={props.font ? props.font.size : '1em'}
          weight={props.font ? props.font.weight : '400'}
          color={props.color}
          align={props.align}
        >
          {props.data.text}
        </_SmallH>
      )}
      {props.markup === 'span' && (
        <_Word
          size={props.font ? props.font.size : '1em'}
          weight={props.font ? props.font.weight : '400'}
          color={props.color}
          align={props.align}
          v_space={props.v_space}
          h_space={props.h_space}
        >
          {props.data.text}
        </_Word>
      )}
      {props.markup === 'p' && (
        <_Sentence
          size={props.font ? props.font.size : '1em'}
          weight={props.font ? props.font.weight : '400'}
          color={props.color}
          align={props.align}
          v_space={props.v_space}
          h_space={props.h_space}
        >
          {props.data.text}
        </_Sentence>
      )}
    </Box>
  )
}

export type BlancTextElementProps = {
  text?: string
}
