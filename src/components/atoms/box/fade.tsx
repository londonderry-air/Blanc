import styled from 'styled-components'
import { Box } from './box'

export const FadeBox = styled(Box)<{
  status: boolean,
  translation: {
    from: 'top' | 'right' | 'bottom' | 'left'
    quantity: string
    duration?: string
  }
}>`
  ${(props) =>
    props.translation.duration
      ? `transition: ${props.translation.duration};`
      : ''}
  opacity: ${(props) => (props.status ? 1 : 0)};
  pointer-events: ${(props) => (props.status ? 'all' : 'none')};
  ${(props) =>
    props.translation.from === 'top'
      ? `transform: translateY(${
          props.status ? '0px' : `calc((-1) * ${props.translation.quantity})`
        })`
      : ''}
  ${(props) =>
    props.translation.from === 'right'
      ? `transform: translateX(${
          props.status ? '0px' : `${props.translation.quantity}`
        })`
      : ''}
    ${(props) =>
    props.translation.from === 'bottom'
      ? `transform: translateY(${
          props.status ? '0px' : `${props.translation.quantity}`
        })`
      : ''}
    ${(props) =>
    props.translation.from === 'left'
      ? `transform: translateX(${
          props.status ? '0px' : `calc((-1) * ${props.translation.quantity})`
        })`
      : ''}
`

export const HoverFadeBox = styled(Box)<{
  amount: {
    fadein: string
    fadeout: string
  }
}>`
  opacity: ${(props) => props.amount.fadeout};
  cursor: pointer;

  &:hover {
    opacity: ${(props) => props.amount.fadein};
  }
`
