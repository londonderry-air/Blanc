import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { Box } from '~/components/layout/box'
import { themeColorState } from '~/states/atoms'
import { moduler } from '~/utils/styles'
import { StackText } from '../text/stack'

const _CellWrap = styled.div<{ width?: string }>`
  width: ${(props) => props.width ?? 'fit-content'};
`

export const Cell = (props: {
  title: string
  subTitle?: string
  width?: string
  colors?: { background: string; text: string; border: string }
  padding?: string
}) => {
  const color = useRecoilValue(themeColorState)
  const colors = props.colors ?? {
    background: color.background,
    text: color.text,
    border: color.border
  }
  return (
    <_CellWrap width={props.width}>
      <Box
        padding={'2px'}
        border={{
          color: colors.border,
          width: '2px',
          style: 'solid',
          radius: '4px'
        }}
      >
        <Box
          padding={props.padding ?? `${moduler(-8)} ${moduler(8)}`}
          background={colors.background}
          border={{
            color: colors.border,
            width: '2px',
            style: 'solid',
            radius: '2px'
          }}
        >
          <StackText
            top={props.title}
            bottom={props.subTitle}
            color={colors.text}
            size={-2}
          ></StackText>
        </Box>
      </Box>
    </_CellWrap>
  )
}
