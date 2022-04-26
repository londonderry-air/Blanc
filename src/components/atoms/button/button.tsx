import { Box } from '~/components/layout/box'
import { moduler } from '~/utils/styles'
import { StackText } from '~/components/atoms/text/stack'
import { color } from '~/utils/variable'
import { ButtonProps } from '$/types/element'
import styled from 'styled-components'

const ButtonWrap = styled.div<{
  width?: string
  isInactive?: boolean
  isInvisible?: boolean
}>`
  width: ${(props) => props.width ?? 'fit-content'};
  ${(props) =>
    props.isInactive || props.isInvisible ? '' : 'cursor: pointer;'}
  ${(props) => (props.isInvisible ? 'opacity: 0;' : '')}

  &:active {
    ${(props) => (props.isInactive ? '' : 'transform: scale(0.98);')}
  }
`

export const Button = (props: ButtonProps) => {
  return (
    <ButtonWrap
      width={props.width}
      isInactive={props.isInactive}
      isInvisible={props.isInvisible}
      onClick={() => {
        if (!props.isInactive && !props.isInvisible) props.onClick()
      }}
    >
      <Box
        padding={props.isBorderHidden ? '0px' : '2px'}
        border={{
          color: props.isInactive
            ? '#ACACAC'
            : props.colors
            ? props.colors.border ?? props.color
            : props.color,
          width: props.isBorderHidden ? '0px' : '2px',
          style: 'solid',
          radius: '4px'
        }}
      >
        <Box
          padding={props.padding ?? `${moduler(-8)} ${moduler(6)}`}
          background={
            props.isInactive
              ? 'transparent'
              : props.colors
              ? props.colors.background ?? props.color
              : props.color
          }
          border={{
            color: props.isInactive
              ? '#ACACAC'
              : props.colors
              ? props.colors.border ?? props.color
              : props.color,
            width: props.isBorderHidden ? '0px' : '2px',
            style: 'solid',
            radius: '2px'
          }}
        >
          <StackText
            top={props.title}
            bottom={props.subTitle}
            color={
              props.isInactive
                ? '#ACACAC'
                : props.colors
                ? props.colors.text ?? color.white
                : color.white
            }
            size={props.size ?? -2}
          />
        </Box>
      </Box>
    </ButtonWrap>
  )
}
