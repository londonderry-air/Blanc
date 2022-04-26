import styled from "styled-components"

export const AnimateSideBorder = styled.a<{
    isActive: boolean, 
    borderColor: string
}>`
    height: fit-content;
    position: relative;
    &:before {
        content: '';
        transition: var(--transition);
        position: absolute;
        width: ${props => props.isActive? '100%' : '3px'};
        height: 100%;
        background-color: ${props => props.borderColor};
        z-index: -1;
    }
`