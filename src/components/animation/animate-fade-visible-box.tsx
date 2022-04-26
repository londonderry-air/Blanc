import styled from 'styled-components'

export const _AnimateFadeVisibleBox = styled.div<{
  isVisible: boolean
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
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  pointer-events: ${(props) => (props.isVisible ? 'all' : 'none')};
  ${(props) =>
    props.translation.from === 'top'
      ? `transform: translateY(${
          props.isVisible ? '0px' : `calc((-1) * ${props.translation.quantity})`
        })`
      : ''}
  ${(props) =>
    props.translation.from === 'right'
      ? `transform: translateX(${
          props.isVisible ? '0px' : `${props.translation.quantity}`
        })`
      : ''}
    ${(props) =>
    props.translation.from === 'bottom'
      ? `transform: translateY(${
          props.isVisible ? '0px' : `${props.translation.quantity}`
        })`
      : ''}
    ${(props) =>
    props.translation.from === 'left'
      ? `transform: translateX(${
          props.isVisible ? '0px' : `calc((-1) * ${props.translation.quantity})`
        })`
      : ''}
`

export const AnimateFadeVisibleBox = (props: {
  isVisible: boolean
  translation: {
    from: 'top' | 'right' | 'bottom' | 'left'
    quantity: string
    duration?: string
  }
  children?: React.ReactNode
}) => {
  return (
    <_AnimateFadeVisibleBox
      isVisible={props.isVisible}
      translation={props.translation}
    >
      {props.children}
    </_AnimateFadeVisibleBox>
  )
}
