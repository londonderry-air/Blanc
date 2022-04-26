import styled from 'styled-components'
import { Box } from '../atoms/box/box'

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
