import { Box } from '~/components/atoms/box/box'
import { _Input } from '~/components/atoms/field/_field'
import styled from 'styled-components'

export const _ElementInput = (props: {
  defaultValue: string
  width?: string
  height?: string
  color?: string
  background?: string
  padding?: string
  align?: 'right' | 'center' | 'left'
  font: {
    weight: string
    size: string
  }
  v_space?: string
  h_space?: string
  placeholder?: string
  onInput: (s: string) => void
}) => {
  return (
    <Box
      width={props.width}
      height={props.height}
      background={props.background}
      padding={props.padding}
      boxSizing={'content-box'}
    >
      <TextEditor
        width={'100%'}
        height={'auto'}
        color={props.color ?? 'canvastext'}
        padding={'0'}
        align={props.align}
        background={'transparent'}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        font={props.font}
        v_space={props.v_space}
        h_space={props.h_space}
        onInput={(e) => {
          if (props.onInput) {
            props.onInput(e.currentTarget.value)
          }
        }}
      />
    </Box>
  )
}

const TextEditor = styled(_Input)`
  overflow-y: hidden;
`
