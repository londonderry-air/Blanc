import { HoverBorderBox } from '../atoms/box/border'
import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { StackText } from '../atoms/text/stack'
import { Box } from '../layout/box'
import Link from 'next/link'

export const EditNavItem = (props: {
  title: string
  subTitle?: string
  isDisplay: boolean
  href: string
  onSelect?: (navKey: string) => void
}) => {
  const color = useRecoilValue(themeColorState)
  return (
    <Link href={props.href}>
      <HoverBorderBox
        padding={'0.5em 1em'}
        unhover={{
          width: props.isDisplay ? '100%' : '0.25em'
        }}
        hover = {{
          width: props.isDisplay ? '100%' : '0.5em'
        }}
        color={color.border}
      >
        <Box width="fit-content">
          <StackText
            top={props.title}
            bottom={props.subTitle}
            color={props.isDisplay ? color.cellText : color.text}
            isCenter={false}
          />
        </Box>
      </HoverBorderBox>
    </Link>
  )
}
