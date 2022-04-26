import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { FieldTitle } from './field-title'
import { FieldDesc } from './field-description'
import { Stack } from '../layout/stack'
import { moduler } from '~/utils/styles'
import { Box } from '../layout/box'
import { Switch } from './field-switch'

export const EditSwitchField = (props: {
  title: string
  subTitle?: string
  description?: string
  state: boolean
  onSwitch: (state: boolean) => void
}) => {
  const color = useRecoilValue(themeColorState)
  return (
    <Box width={'60ch'}>
      <Stack margin={moduler(2)}>
        <FieldTitle
          title={props.title}
          subTitle={props.subTitle}
          text={{ color: color.text }}
          border={{
            color: color.border,
            width: '4px'
          }}
        />
        {props.description && (
          <FieldDesc color={color.grayText} description={props.description} />
        )}
        <Switch
          state={props.state}
          onSwitch={(state) => props.onSwitch(state)}
        />
      </Stack>
    </Box>
  )
}
