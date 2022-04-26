import styled from 'styled-components'

export const _MainH = styled.h1<_TextProps>`
  ${(props) => (props.size ? `font-size: ${props.size};` : '')}
  ${(props) => (props.weight ? `font-weight: ${props.weight};` : '')}
    ${(props) => (props.family ? `font-family: ${props.family};` : '')}
    ${(props) => (props.color ? `color: ${props.color};` : '')}
    ${(props) => (props.v_space ? `line-height: ${props.v_space};` : '')}
    ${(props) => (props.h_space ? `letter-spacing: ${props.h_space};` : '')}
    ${(props) => (props.align ? `text-align: ${props.align};` : '')}
`

export const _LargeH = styled.h2<_TextProps>`
  ${(props) => (props.size ? `font-size: ${props.size};` : '')}
  ${(props) => (props.weight ? `font-weight: ${props.weight};` : '')}
    ${(props) => (props.family ? `font-family: ${props.family};` : '')}
    ${(props) => (props.color ? `color: ${props.color};` : '')}
    ${(props) => (props.v_space ? `line-height: ${props.v_space};` : '')}
    ${(props) => (props.h_space ? `letter-spacing: ${props.h_space};` : '')}
`

export const _MidH = styled.h3<_TextProps>`
  ${(props) => (props.size ? `font-size: ${props.size};` : '')}
  ${(props) => (props.weight ? `font-weight: ${props.weight};` : '')}
    ${(props) => (props.family ? `font-family: ${props.family};` : '')}
    ${(props) => (props.color ? `color: ${props.color};` : '')}
    ${(props) => (props.v_space ? `line-height: ${props.v_space};` : '')}
    ${(props) => (props.h_space ? `letter-spacing: ${props.h_space};` : '')}
`

export const _SmallH = styled.h4<_TextProps>`
  ${(props) => (props.size ? `font-size: ${props.size};` : '')}
  ${(props) => (props.weight ? `font-weight: ${props.weight};` : '')}
    ${(props) => (props.family ? `font-family: ${props.family};` : '')}
    ${(props) => (props.color ? `color: ${props.color};` : '')}
    ${(props) => (props.v_space ? `line-height: ${props.v_space};` : '')}
    ${(props) => (props.h_space ? `letter-spacing: ${props.h_space};` : '')}
`

export const _Sentence = styled.p<_TextProps>`
  ${(props) => (props.size ? `font-size: ${props.size};` : '')}
  ${(props) => (props.weight ? `font-weight: ${props.weight};` : '')}
    ${(props) => (props.family ? `font-family: ${props.family};` : '')}
    ${(props) => (props.color ? `color: ${props.color};` : '')}
    ${(props) => (props.v_space ? `line-height: ${props.v_space};` : '')}
    ${(props) => (props.h_space ? `letter-spacing: ${props.h_space};` : '')}
    ${(props) => (props.align ? `text-align: ${props.align};` : '')}
    white-space: pre-wrap;
`

export const _Word = styled.span<_TextProps>`
  ${(props) => (props.size ? `font-size: ${props.size};` : '')}
  ${(props) => (props.weight ? `font-weight: ${props.weight};` : '')}
    ${(props) => (props.family ? `font-family: ${props.family};` : '')}
    ${(props) => (props.color ? `color: ${props.color};` : '')}
    ${(props) => (props.v_space ? `line-height: ${props.v_space};` : '')}
    ${(props) => (props.h_space ? `letter-spacing: ${props.h_space};` : '')}
    ${(props) => (props.align ? `text-align: ${props.align};` : '')}
`

export type _TextProps = {
  size?: string
  weight?: string
  family?: string
  color?: string
  v_space?: string
  h_space?: string
  align?: 'center' | 'left' | 'right'
}
