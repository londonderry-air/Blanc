import styled from 'styled-components'
import { Box } from './box'

export const AlignBox = styled(Box)<{
  align: 'left' | 'center' | 'right'
}>`
  ${(props) =>
    props.align === 'left' || props.align === 'center'
      ? 'margin-right: auto;'
      : ''}
  ${(props) =>
    props.align === 'right' || props.align === 'center'
      ? 'margin-left: auto;'
      : ''}
  ${(props) =>
    props.align === 'right' &&
    ('absolute' === props.position || 'fixed' === props.position)
      ? 'right: 0;'
      : ''}
  ${(props) =>
    props.align === 'left' &&
    ('absolute' === props.position || 'fixed' === props.position)
      ? 'left: 0;'
      : ''}
  ${(props) =>
    props.align === 'center' &&
    ('absolute' === props.position || 'fixed' === props.position)
      ? `
    transform: translate(50%, 50%);
    right: -50%;
    left: -50%;
  `
      : ''}
`
