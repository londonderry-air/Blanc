import { BlancElement } from '$/types/_element'
import { AlignBox } from '~/components/atoms/box/align'
import { moduler } from '~/utils/styles'
import {
  BlancElementText,
  BlancTextElementProps
} from '../base/blanc-element-text'

export const BlancCommonText = (props: BlancCommonTextProps) => {
  return (
    <AlignBox align={'center'} width={'60ch'} margin={'0 0 30px 0'}>
      <BlancElementText
        data={props.data}
        font={{ size: moduler(-1), weight: '400' }}
        markup={'p'}
        align={'left'}
        h_space={'0.06em'}
        v_space={'1.8em'}
        placeholder={'テキストを入力してください'}
      />
    </AlignBox>
  )
}

export default BlancCommonText

type BlancCommonTextProps = BlancElement & {
  data: BlancTextElementProps
}
