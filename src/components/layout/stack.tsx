import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div<{
  margin: string
  borderColor: { wrap?: string; items?: string }
}>`
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.borderColor.wrap
      ? `border-top: solid 4px ${props.borderColor.wrap};`
      : ''}

  > * {
    margin-top: ${(props) => props.margin};
    ${(props) =>
      props.borderColor.items
        ? `border-top: solid 1px ${props.borderColor.items};`
        : ''}
  }

  > *:nth-child(999) {
    margin-top: 0;
    border-top: none;
  }
`

export const Stack = (props: StackProps) => {
  const margin = props.margin
  const borderColor = props.borderColor ?? {}
  const children = props.children

  return (
    <Wrap margin={margin} borderColor={borderColor}>
      {children}
    </Wrap>
  )
}

type StackProps = {
  margin: string
  borderColor?: { wrap?: string; items?: string }
  children: React.ReactNode
}
