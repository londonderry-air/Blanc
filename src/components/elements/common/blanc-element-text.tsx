import { BlancElement } from '$/types/_element'
import {
  BlancElementText,
  BlancTextElementProps
} from '../base/blanc-element-text'

export const BlancCommonText = (props: BlancCommonTextProps) => {
  return (
    <BlancElementText
      data={props.data}
      font={{ size: '2em', weight: '600' }}
      padding={'30px'}
      markup={'p'}
      align={'center'}
      placeholder={'テキストを入力してください'}
    />
  )
}

export default BlancCommonText

type BlancCommonTextProps = BlancElement & {
  data: BlancTextElementProps
}
