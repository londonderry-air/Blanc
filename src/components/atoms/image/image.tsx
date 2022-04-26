import styled from 'styled-components'
import { BorderProps } from '~/components/layout/box'

export const Image = styled.div<{
  width: string
  height: string
  src: string
  fit: NonNullable<JSX.IntrinsicElements['img']['style']>['objectFit']
  radius?: string
  border?: BorderProps
  cursor?: NonNullable<JSX.IntrinsicElements['img']['style']>['pointer']
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  ${(props) => (props.radius ? `border-radius: ${props.radius};` : '')}
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : '')}
  overflow: hidden;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: ${(props) => props.fit};
  ${(props) =>
    props.border
      ? `
    border-width: ${props.border.width ?? '1px'};
    border-style: ${props.border.style ?? 'solid'};
    border-color: ${props.border.color ?? 'gray'};
  `
      : ''}
`
