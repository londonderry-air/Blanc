import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { FieldTitle } from './field-title'
import { FieldDesc } from './field-description'
import { moduler } from '~/utils/styles'
import { Box } from '../layout/box'
import { Switch } from './field-switch'
import { FlexBox } from '../atoms/box/flex'

export const SideSwitchField = (props: {
  title: string
  subTitle?: string
  description?: string
  state: boolean
  onSwitch: (state: boolean) => void
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
        <Switch
          state={props.state}
          onSwitch={(state) => props.onSwitch(state)}
        />
      </FlexBox>
    </Box>
  )
}
