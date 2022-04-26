import styled from 'styled-components'
import { Box } from './box'

export const BorderBox = styled(Box)<{
  borderPosition: 'top' | 'bottom' | 'right' | 'left' | 'all'
  borderWidth: string
  borderColor: string
  borderStyle: NonNullable<JSX.IntrinsicElements['div']['style']>['borderStyle']
}>`
  ${(props) =>
    props.borderPosition === 'bottom'
      ? `border-bottom: ${props.borderStyle} ${props.borderWidth}
      ${props.borderColor};`
      : ''}
  ${(props) =>
    props.borderPosition === 'top'
      ? `border-top: ${props.borderStyle} ${props.borderWidth}
          ${props.borderColor};`
      : ''}
    ${(props) =>
    props.borderPosition === 'right'
      ? `border-right: ${props.borderStyle} ${props.borderWidth}
          ${props.borderColor};`
      : ''}
    ${(props) =>
    props.borderPosition === 'left'
      ? `border-left ${props.borderStyle} ${props.borderWidth}
          ${props.borderColor};`
      : ''}
    ${(props) =>
    props.borderPosition === 'all'
      ? `border: ${props.borderStyle} ${props.borderWidth}
          ${props.borderColor};`
      : ''}
`
