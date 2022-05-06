import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { FieldTitle } from './field-title'
import { FieldDesc } from './field-description'
import { Stack } from '../layout/stack'
import { moduler } from '~/utils/styles'
import { Input } from './field-input'
import { Box } from '../atoms/box/box'
import { Validator } from './validator'

export const EditTextField = (props: {
  width?: string
  title: string
  subTitle?: string
  description?: string
  defaultValue?: string
  validators?: [{
    title: {
      local: string,
      global?: string
    }
    regex: RegExp
  }]
  isRequired?: boolean
  onInput: (str: string, isValid?: boolean) => void
}) => {
  const color = useRecoilValue(themeColorState)
  const validators = props.validators ?? []
  return (
    <Box width={props.width ?? '60ch'}>
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
        <Input
          width={'100%'}
          onInput={(s) => {
            const res = validators.some(v => v.regex.test(s))
            console.log(res)
            props.onInput(s)
          }}
          defaultValue={props.defaultValue}
        />
        <Box width={'30ch'}>
        {validators.map((v, i) => (
            <Validator key={i} title={v.title} value={props.defaultValue ?? ''} regex={v.regex} />
        ))}
        </Box>
      </Stack>
    </Box>
  )
}
