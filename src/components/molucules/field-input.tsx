import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { moduler } from '~/utils/styles'
import { _Input } from '../atoms/field/_field'

export const Input = (props: {
  width?: string
  background?: string
  color?: string
  padding?: string
  placeholder?: string
  defaultValue?: string
  font?: {
    size?: string
    weight?: string
  }
  onInput?: (str: string) => void
}) => {
  const color = useRecoilValue(themeColorState)
  return (
    <_Input
      width={props.width ?? '60ch'}
      color={props.color ?? color.text}
      padding={props.padding ?? `${moduler(0)} ${moduler(0)}`}
      background={props.background ?? color.fieldBackground}
      border={{
        radius: '4px'
      }}
      v_space={moduler(3)}
      placeholder={props.placeholder ?? 'テキストを入力してください'}
      font={props.font}
      defaultValue={props.defaultValue ?? ''}
      onInput={(e) => {
        if (props.onInput) {
          props.onInput(e.currentTarget.value)
        }
      }}
    ></_Input>
  )
}
