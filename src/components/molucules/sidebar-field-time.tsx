import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { FieldTitle } from './field-title'
import { FieldDesc } from './field-description'
import { Stack } from '../layout/stack'
import { moduler } from '~/utils/styles'
import { Box } from '../layout/box'
import { TimePicker } from './field-time'

export const SideTimeField = (props: {
  title: string
  subTitle?: string
  description?: string
  defaultValue?: Date | null
  isEnableEmpty?: boolean
  onSelect: (d: Date | null) => void
}) => {
  const color = useRecoilValue(themeColorState)
  return (
    <Box width={'100%'}>
      <Stack margin={moduler(2)}>
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
            size={-6}
            color={color.grayText}
            description={props.description}
          />
        )}
        <TimePicker
          defaultValue={props.defaultValue}
          onSelect={props.onSelect}
          isEnableEmpty={props.isEnableEmpty}
        />
      </Stack>
    </Box>
  )
}
