import styled from 'styled-components';

const Wrap = styled.div<{
    maxWidth: string, 
    paddingLeft?: string, 
    paddingRight?: string
}>`
    margin-left: auto;
    margin-right: auto;
    box-sizing: content-box;
    max-width: ${props => props.maxWidth};
    ${props => props.paddingLeft ? `padding-left: ${props.paddingLeft}` : ''}
    ${props => props.paddingRight ? `padding-right: ${props.paddingRight}` : ''}
`

export const Center = (props: CenterProps) => {
    const children = props.children;
    const maxWidth = props.maxWidth ?? '100%';
    const paddingLeft = props.paddingLeft;
    const paddingRight = props.paddingRight;
    
    return (
        <Wrap
            maxWidth={maxWidth}
            paddingLeft={paddingLeft}
            paddingRight={paddingRight}
        >
            {children}
        </Wrap>
    )
}

type CenterProps = {
    children: React.ReactNode;
    maxWidth?: string;
    paddingLeft?: string;
    paddingRight?: string;
}