import styled from 'styled-components'
import React from 'react'

const wrapStyle = (limit: number, gap?: string, breakpoint?: string) => {
  let style = `
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        ${gap ? `gap: ${gap};` : ''}
    
        * {
            flex-grow: 1;
            flex-basis: calc((${breakpoint} - 100%) * 999);
        }
    `
  ;[...Array(limit)]
    .map((v, i) => i)
    .forEach((n) => {
      style += `
            *:nth-child(${n + 1}) {
                flex-basis: 100%;
            }
        `
    })
  return style
}

const Wrap = styled.div<{ limit: number; gap?: string; breakpoint?: string }>`
  ${(props) => wrapStyle(props.limit, props.gap, props.breakpoint)}
`

export const Switcher = (props: SwitcherProps) => {
  const children = props.children
  const gap = props.gap
  const breakpoint = props.breakpoint ?? ''
  const limit = props.limit ?? 10

  return (
    <Wrap gap={gap} breakpoint={breakpoint} limit={limit}>
      {children}
    </Wrap>
  )
}

type SwitcherProps = {
  children: React.ReactNode
  breakpoint?: string
  limit?: number
  gap?: string
}
