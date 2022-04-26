import styled from 'styled-components'
import { Box } from './box'

export const ShadowBox = styled(Box)<{
  shadow: string
}>`
  ${(props) => `box-shadow: ${props.shadow};`}
`
