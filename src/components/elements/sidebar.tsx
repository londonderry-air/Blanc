import styled from 'styled-components'
import { Box } from '../atoms/box/box'

export const Sidebar = styled(Box)<{
  gap?: string
  sideWidth: string
  sidePosition: 'right' | 'left'
}>`
  display: flex;
  flex-direction: row;
  align-item: flex-start;
  justify-content: flex-start;
  ${(props) => (props.gap ? `gap: ${props.gap};` : '')}

  > *:nth-child(${(props) => (props.sidePosition === 'left' ? 1 : 2)}) {
    flex-grow: 1;
    height: 100%;
    flex-basis: ${(props) => props.sideWidth};
    max-width: ${(props) => props.sideWidth};
  }

  > *:nth-child(${(props) => (props.sidePosition === 'right' ? 1 : 2)}) {
    flex-grow: 9999;
    flex-basis: 0;
    min-width: 50%;
    height: 100%;
  }
`
