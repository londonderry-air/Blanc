import { BlancElement } from '$/types/_element'
import { useEffect, useRef } from 'react'
import { FlexBox } from '~/components/atoms/box/flex'
import { _Word } from '~/components/atoms/text/_text'
import {
  BlancElementText,
  BlancTextElementProps
} from '../base/blanc-element-text'
import { moduler } from '~/utils/styles'
import { AlignBox } from '~/components/atoms/box/align'

export const BlancCommonText = (props: BlancCommonTextProps) => {
  const countRef = useRef(0)

  useEffect(() => {
    if (!props.post) return
    const elements = props.post.elements as unknown as BlancElement[]
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].id === props.id) {
        break
      }
      if (
        (elements[i] as unknown as BlancElement).component === 'common-section'
      ) {
        countRef.current += 1
      }
    }
  }, [])

  return (
    <AlignBox width={'60ch'} align={'center'}>
      <FlexBox way={'row'} gap={'1em'} alignItems={'center'}>
        <_Word size={moduler(6)} weight={'600'}>
          {zeroPadding(countRef.current + 1, 2)}
        </_Word>
        <BlancElementText
          width={'100%'}
          data={props.data}
          font={{ size: moduler(2), weight: '600' }}
          padding={'30px'}
          markup={'p'}
          placeholder={'テキストを入力してください'}
        />
      </FlexBox>
    </AlignBox>
  )
}

export default BlancCommonText

const zeroPadding = (numbering: number | string, count = 3) => {
  if (typeof numbering === 'string') {
    return numbering.padStart(count, '0')
  } else if (typeof numbering === 'number') {
    return numbering.toString().padStart(count, '0')
  } else {
    return '000'
  }
}

type BlancCommonTextProps = BlancElement & {
  data: BlancTextElementProps
}
