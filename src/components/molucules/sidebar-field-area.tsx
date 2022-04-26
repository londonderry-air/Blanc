import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { FieldTitle } from './field-title'
import { FieldDesc } from './field-description'
import { moduler } from '~/utils/styles'
import { Box } from '../layout/box'
import { Area } from './field-area'
import { FlexBox } from '../atoms/box/flex'

export const SideAreaField = (props: {
  title: string
  subTitle?: string
  description?: string
  defaultValue?: string
  onInput: (str: string) => void
}) => {
  const color = useRecoilValue(themeColorState)
  return (
    <Box width={'100%'}>
      <FlexBox way={'column'} gap={moduler(2)}>
        <FieldTitle
          title={props.title}
          subTitle={props.subTitle}
          text={{ color: color.text }}
          border={{
            color: color.border,
            width: '4px'
          }}
          size={-2}
        />
        {props.description && (
          <FieldDesc
            color={color.grayText}
            description={props.description}
            size={-4}
          />
        )}
        <Area
          width={'100%'}
          height={'12em'}
          font={{
            size: moduler(-2)
          }}
          onInput={(s) => props.onInput(s)}
          defaultValue={props.defaultValue}
        />
      </FlexBox>
    </Box>
  )
}
