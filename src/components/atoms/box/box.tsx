import styled from 'styled-components'

export const Box = styled.div<{
  width?: string
  height?: string
  minWidth?: string
  minHeight?: string
  maxWidth?: string
  maxHeight?: string
  position?: NonNullable<JSX.IntrinsicElements['div']['style']>['position']
  background?: string
  margin?: string
  padding?: string
  radius?: string
  overflow?: {
    x?: NonNullable<JSX.IntrinsicElements['div']['style']>['overflowX']
    y?: NonNullable<JSX.IntrinsicElements['div']['style']>['overflowY']
  }
  boxSizing?: NonNullable<JSX.IntrinsicElements['div']['style']>['boxSizing']
  opacity?: string
  zIndex?: string
  pointerEvents?: NonNullable<
    JSX.IntrinsicElements['div']['style']
  >['pointerEvents']
}>`
  ${(props) =>
    props.background ? `background-color: ${props.background};` : ''}
  ${(props) => (props.position ? `position: ${props.position};` : '')}
  ${(props) => (props.padding ? `padding: ${props.padding};` : '')}
  ${(props) => (props.width ? `width: ${props.width};` : '')}
  ${(props) => (props.height ? `height: ${props.height};` : '')}
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
  ${(props) => (props.radius ? `border-radius: ${props.radius};` : '')}
  ${(props) => (props.boxSizing ? `box-sizing: ${props.boxSizing};` : '')}
  ${(props) => (props.opacity ? `opacity: ${props.opacity};` : '')}
  ${(props) => (props.zIndex ? `z-index: ${props.zIndex};` : '')}
  ${(props) => (props.minWidth ? `min-width: ${props.minWidth};` : '')}
  ${(props) => (props.minHeight ? `min-height: ${props.minHeight};` : '')}
  ${(props) => (props.maxWidth ? `max-width: ${props.maxWidth};` : '')}
  ${(props) => (props.maxHeight ? `max-height: ${props.maxHeight};` : '')}
  ${(props) =>
    props.pointerEvents ? `pointer-events: ${props.pointerEvents};` : ''}
  ${(props) =>
    props.overflow
      ? props.overflow.x
        ? `overflow-x: ${props.overflow.x};`
        : ''
      : ''}
  ${(props) =>
    props.overflow
      ? props.overflow.y
        ? `overflow-y: ${props.overflow.y};`
        : ''
      : ''}
`
