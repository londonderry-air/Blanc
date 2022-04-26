import styled from 'styled-components'

export const AnimateHoverBorderBox = styled.div<{
  padding?: string
  unhoverWidth?: string
  hoverWidth?: string
  color: string
}>`
  position: relative;
  padding: ${(props) => props.padding ?? '0.75em'};
  cursor: pointer;
  z-index: 1;

  &:before {
    content: '';
    position: absolute;
    transition: 0.2s;
    top: 0;
    left: 0;
    width: ${(props) => props.unhoverWidth ?? '0.25em'};
    height: 100%;
    background: ${(props) => props.color};
    z-index: -1;
  }

  &:hover {
    &:before {
      width: ${(props) => props.hoverWidth ?? '0.5em'};
    }
  }
`
