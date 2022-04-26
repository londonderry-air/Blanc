import styled from 'styled-components'
import { BorderProps } from '~/components/layout/box'
import { Box } from './box'

export const FlexBox = styled(Box)<{
  way: 'row' | 'column'
  wrap?: 'wrap' | 'nowrap'
  alignItems?: string
  justifyContent?: string
  grow?: string
  gap?: string
  border?: BorderProps
}>`
  display: flex;
  flex-direction: ${(props) => props.way ?? 'row'};
  flex-wrap: ${(props) => props.wrap ?? 'nowrap'};
  align-items: ${(props) => props.alignItems ?? 'flex-start'};
  justify-content: ${(props) => props.justifyContent ?? 'flex-start'};
  gap: ${(props) => (props.gap && !props.border ? props.gap : '0')};
  flex-grow: ${(props) => props.grow ?? '0'};

  > * {
    ${(props) =>
      props.border
        ? `
      border-bottom-width: ${props.border.width ?? '1px'};
      border-bottom-style: ${props.border.style ?? 'solid'};
      border-bottom-color: ${props.border.color ?? 'gray'};
    `
        : ''}
    ${(props) =>
      props.gap && props.border
        ? `
      padding-top: ${props.gap};
      padding-bottom: ${props.gap};
    `
        : ''}
    &:nth-last-child(1) {
      ${(props) => (props.border ? 'border-bottom-style: hidden;' : '')}
    }
  }
`
