import { FlexBox } from '../atoms/box/flex'
import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { Link } from '../atoms/link/Link'
import { StackText } from '~/components/atoms/text/stack'

export const AppHeaderLink = (props: {
  title: string
  subTitle?: string
  href: string
  isDisplaying: boolean
}) => {
  const color = useRecoilValue(themeColorState)
  return (
    <Link href={props.href}>
      <FlexBox
        way={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        width={'6em'}
        opacity={props.isDisplaying ? '1' : '0.3'}
      >
        <StackText
          top={props.title}
          bottom={props.subTitle}
          color={color.text}
          size={-3}
        />
      </FlexBox>
    </Link>
  )
}
