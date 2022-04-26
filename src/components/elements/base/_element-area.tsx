import React, { useEffect, useRef, useState } from 'react'
import { Box } from '~/components/atoms/box/box'
import { _Area } from '~/components/atoms/field/_field'
import styled from 'styled-components'

export const _ElementArea = (props: {
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
  const ref = useRef() as React.MutableRefObject<HTMLTextAreaElement>
  const [areaHeight, setAreaHeight] = useState(props.height ?? 'auto')

  useEffect(() => {
    if (ref.current) setAreaHeight(getAreaHeight(ref))
  }, [ref])

  return (
    <Box
      width={props.width}
      height={areaHeight}
      background={props.background}
      padding={props.padding}
      boxSizing={'content-box'}
    >
      <TextEditor
        ref={ref}
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
          setAreaHeight(getAreaHeight(ref))
        }}
      />
    </Box>
  )
}

const getAreaHeight = (ref: React.MutableRefObject<HTMLTextAreaElement>) => {
  if (!ref.current) return '0'
  ref.current.style.height = 'auto'
  ref.current.style.height = `${ref.current.scrollHeight}px`
  return `${ref.current.scrollHeight}px`
}

const TextEditor = styled(_Area)`
  overflow-y: hidden;
`
