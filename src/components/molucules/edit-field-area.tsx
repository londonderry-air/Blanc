import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { FieldTitle } from './field-title'
import { FieldDesc } from './field-description'
import { Stack } from '../layout/stack'
import { moduler } from '~/utils/styles'
import { Box } from '../layout/box'
import { Area } from './field-area'

export const EditAreaField = (props: {
  title: string
  subTitle?: string
  description?: string
  defaultValue?: string
  onInput: (str: string) => void
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
        <Area
          width={'100%'}
          onInput={(s) => props.onInput(s)}
          defaultValue={props.defaultValue}
        />
      </Stack>
    </Box>
  )
}
