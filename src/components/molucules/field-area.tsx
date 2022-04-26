import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { moduler } from '~/utils/styles'
import { _Area } from '../atoms/field/_field'

export const Area = (props: {
  width?: string
  height?: string
  background?: string
  defaultValue?: string
  font?: {
    size?: string
    weight?: string
  }
  onInput?: (str: string) => void
}) => {
  const color = useRecoilValue(themeColorState)
  return (
    <_Area
      width={props.width ?? '60ch'}
      height={props.height ?? '30ex'}
      color={color.text}
      padding={`${moduler(0)} ${moduler(0)}`}
      background={props.background ?? color.fieldBackground}
      placeholder={'テキストを入力してください'}
      defaultValue={props.defaultValue ?? ''}
      v_space={moduler(4)}
      h_space={'0.02em'}
      border={{
        radius: '4px'
      }}
      font={props.font}
      onInput={(e) => {
        if (props.onInput) {
          props.onInput(e.currentTarget.value)
        }
      }}
    ></_Area>
  )
}
