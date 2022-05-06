import styled from 'styled-components'
import { moduler } from '~/utils/styles'

export const _Input = styled.input<_InputProps>`
  ${(props) => (props.width ? `width: ${props.width};` : '')}
  ${(props) => (props.height ? `height: ${props.height};` : '')}
    ${(props) => (props.color ? `color: ${props.color};` : '')}
    ${(props) => (props.background ? `background: ${props.background};` : '')}
    ${(props) => (props.padding ? `padding: ${props.padding};` : '')}
    ${(props) => (props.align ? `text-align: ${props.align};` : '')}
    ${(props) => (props.v_space ? `line-height: ${props.v_space};` : '')}
    ${(props) => (props.h_space ? `letter-spacing: ${props.h_space};` : '')}
    ${(props) =>
    props.border
      ? props.border.width
        ? `border-width: ${props.border.width};`
        : ''
      : ''}
    ${(props) =>
    props.border
      ? props.border.color
        ? `border-color: ${props.border.color};`
        : ''
      : ''}
    ${(props) =>
    props.border
      ? props.border.width
        ? `border-style: ${props.border.style};`
        : ''
      : ''}
    ${(props) =>
    props.border
      ? props.border.radius
        ? `border-radius: ${props.border.radius};`
        : ''
      : ''}
      ${(props) =>
    props.font ? (props.font.size ? `font-size: ${props.font.size};` : '') : ''}
          ${(props) =>
    props.font
      ? props.font.weight
        ? `font-weight: ${props.font.weight};`
        : ''
      : ''}
`
export const _Area = styled.textarea<_InputProps>`
  ${(props) => (props.width ? `width: ${props.width};` : '')}
  ${(props) => (props.height ? `height: ${props.height};` : '')}
    ${(props) => (props.color ? `color: ${props.color};` : '')}
    ${(props) => (props.background ? `background: ${props.background};` : '')}
    ${(props) => (props.padding ? `padding: ${props.padding};` : '')}
    ${(props) => (props.align ? `text-align: ${props.align};` : '')}
    ${(props) => (props.v_space ? `line-height: ${props.v_space};` : '')}
    ${(props) => (props.h_space ? `letter-spacing: ${props.h_space};` : '')}
    ${(props) =>
    props.border
      ? props.border.width
        ? `border-width: ${props.border.width};`
        : ''
      : ''}
    ${(props) =>
    props.border
      ? props.border.color
        ? `border-color: ${props.border.color};`
        : ''
      : ''}
    ${(props) =>
    props.border
      ? props.border.width
        ? `border-style: ${props.border.style};`
        : ''
      : ''}
    ${(props) =>
    props.border
      ? props.border.radius
        ? `border-radius: ${props.border.radius};`
        : ''
      : ''}
    ${(props) =>
    props.font ? (props.font.size ? `font-size: ${props.font.size};` : '') : ''}
    ${(props) =>
    props.font
      ? props.font.weight
        ? `font-weight: ${props.font.weight};`
        : ''
      : ''}
    transition: height 0s;
`

export const _CheckBox = styled.label<_CheckBoxProps>`
  position: relative;
  cursor: pointer;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: ${(props) => (props.isActive ? 'transparent' : props.background)};
  border: solid 2px
    ${(props) => (props.isActive ? props.activeColor : props.background)};

  &:after {
    position: absolute;
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 2px;
    background: ${(props) => props.activeColor};
    opacity: ${(props) => (props.isActive ? 1 : 0)};
    top: 50%;
    left: 50%;
    transform: ${(props) =>
      props.isActive
        ? 'translate(-50%, -50%) scale(1.0)'
        : 'translate(-50%, -50%) scale(0.7)'};
    transition: 0.2s;
  }
`

export const _CheckBoxInput = styled.input<_InputProps>`
  display: none;
`

export const _SelectingWrap = styled.div<{ color: string }>`
  position: relative;
  padding: 2px;
  border: solid 1px ${(props) => props.color};
  border-radius: 2px;
  cursor: pointer;
`

export const _Selecting = styled.div<{ color: string }>`
    padding: ${moduler(-8)} ${moduler(3)};
    border: solid 1px ${(props) => props.color};
    border-radius: 4px:
`

export const _SelectList = styled.div<{
  background: string
  border: string
  isOpen: boolean
  width?: string
}>`
  position: fixed;
  display: flex;
  background: #ffffff;
  flex-direction: column;
  width: ${(props) => (props.isOpen ? props.width ?? '30ch' : '6px')};
  transition: 0.26s;
  height: 30ex;
  transform: translateX(${(props) => (props.isOpen ? '0' : '1em')})
    translateY(1em);
  overflow-y: scroll;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  pointer-events: ${(props) => (props.isOpen ? 'all' : 'none')};
  border: solid 1px ${(props) => props.border};

  z-index: 2;
`

export const _SelectListItem = styled.div<{
  background: string
  border: string
  isSelected: boolean
  padding?: string
}>`
  width: 100%;
  position: relative;
  border-bottom: solid 1px ${(props) => props.border};

  padding: ${(props) => props.padding ?? moduler(-1)};
  cursor: pointer;

  &:before {
    content: '';
    position: absolute;
    transition: 0.2s;
    top: 0;
    left: 0;
    width: ${(props) => (props.isSelected ? '100%' : '0px')};
    height: 100%;
    background: ${(props) => props.background};
    z-index: -1;
  }

  &:hover {
    &:before {
      width: ${(props) => (props.isSelected ? '100%' : '6px')};
    }
  }
`

type _InputProps = {
  width?: string
  height?: string
  padding?: string
  color?: string
  background?: string
  border?: _InputBorderProps
  align?: 'right' | 'center' | 'left'
  v_space?: string
  h_space?: string
  font?: {
    size?: string
    weight?: string
  }
}

type _InputBorderProps = {
  width?: string
  color?: string
  style?: string
  radius?: string
}

type _CheckBoxProps = {
  isActive: boolean
  background?: string
  activeColor: string
}
