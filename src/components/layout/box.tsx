import styled from 'styled-components'

const Wrap = styled.div<{
  background?: string
  color?: string
  padding?: string
  overflow?: string
  isFitContent?: boolean
  width?: string
  height?: string
  backdropFilter?: string
  grow?: string
  border: BorderProps
}>`
  ${(props) =>
    props.background ? `background-color: ${props.background};` : ''}
  ${(props) => (props.width ? `width: ${props.width};` : '')}
    ${(props) => (props.height ? `height: ${props.height};` : '')}
    ${(props) => (props.color ? `color: ${props.color};` : '')}
    ${(props) => (props.padding ? `padding: ${props.padding};` : '')}
    ${(props) => (props.overflow ? `overflow: ${props.overflow};` : '')}
    ${(props) => (props.isFitContent ? `width: fit-content;` : '')}
    ${(props) =>
    props.backdropFilter ? `backdrop-filter: ${props.backdropFilter};` : ''}
    ${(props) =>
    props.border.width ? `border-width: ${props.border.width};` : ''}
    ${(props) =>
    props.border.color ? `border-color: ${props.border.color};` : ''}
    ${(props) =>
    props.border.width ? `border-style: ${props.border.style};` : ''}
    ${(props) =>
    props.border.radius ? `border-radius: ${props.border.radius};` : ''}
    ${(props) => (props.grow ? `flex-grow: ${props.grow};` : '')}
`

export const Box = (props: BoxProps) => {
  const children = props.children
  const className = props.className
  const width = props.width
  const height = props.height
  const background = props.background
  const backdropFilter = props.backdropFilter
  const color = props.color
  const padding = props.padding
  const border = props.border ?? {}
  const overflow = props.overflow
  const isFitContent = props.isFitContent ?? false
  const grow = props.grow

  return (
    <Wrap
      className={className}
      width={width}
      height={height}
      background={background}
      backdropFilter={backdropFilter}
      color={color}
      padding={padding}
      overflow={overflow}
      border={border}
      isFitContent={isFitContent}
      grow={grow}
    >
      {children}
    </Wrap>
  )
}

type BoxProps = {
  children: React.ReactNode
  className?: string
  width?: string
  height?: string
  background?: string
  backdropFilter?: string
  color?: string
  padding?: string
  border?: BorderProps
  overflow?: string
  isFitContent?: boolean
  grow?: string
}

export type BorderProps = {
  width?: string
  color?: string
  style?: NonNullable<JSX.IntrinsicElements['div']['style']>['borderStyle']
  radius?: string
}
