import { BlancElement } from '$/types/$element'
import { BorderBox } from '~/components/atoms/box/border'
import { AlignBox } from '~/components/atoms/box/align'
import { FlexBox } from '~/components/atoms/box/flex'
import {
  BlancElementText,
  BlancTextElementProps
} from '../base/blanc-element-text'
import { moduler } from '~/utils/styles'

export const BlancCommonCode = (props: { data: BlancCommonCodeProps }) => {
  if (!props.data.data) {
    props.data.data = {}
    props.data.data.codeName = {}
    props.data.data.code = {}
  }

  return (
    <AlignBox align={'center'} width={'60ch'} margin={'0 0 2em 0'}>
      <FlexBox way={'column'} width={'60ch'}>
        <BorderBox
          width={'100%'}
          borderWidth={'3px'}
          borderStyle={'solid'}
          borderPosition={'all'}
          borderColor={'#1C1C21'}
          background={'#DEFF4A'}
          padding={'0'}
        >
          <BlancElementText
            data={props.data.data.codeName}
            font={{ size: moduler(-1), weight: '600' }}
            padding={'10px 20px'}
            markup={'span'}
            align={'left'}
            isOneLine={true}
            placeholder={'テキストを入力してください'}
          />
        </BorderBox>
        <BorderBox
          width={'100%'}
          borderWidth={'3px'}
          borderStyle={'solid'}
          borderPosition={'all'}
          borderColor={'#1C1C21'}
          background={'#1C1C21'}
        >
          <BlancElementText
            data={props.data.data.code}
            font={{ size: moduler(-1), weight: '400' }}
            padding={'20px 20px'}
            markup={'p'}
            align={'left'}
            v_space={'1.6em'}
            h_space={'0.04em'}
            color={'#FFFFFF'}
            placeholder={'テキストを入力してください'}
          />
        </BorderBox>
      </FlexBox>
    </AlignBox>
  )
}

export default BlancCommonCode

type BlancCommonCodeProps = BlancElement & {
  data: {
    codeName: BlancTextElementProps
    code: BlancTextElementProps
  }
}
