import { BlancElement } from '$/types/$element'
import { AlignBox } from '~/components/atoms/box/align'
import {
  BlancElementImage,
  BlancImageElementProps
} from '../base/blanc-element-image'

export const BlancCommonImage = (props: BlancCommonImageProps) => {
  return (
    <AlignBox align={'center'} width={'60ch'}>
      <BlancElementImage width={'60ch'} height={'240px'} data={props.data} />
    </AlignBox>
  )
}

export default BlancCommonImage

type BlancCommonImageProps = BlancElement & {
  data: BlancImageElementProps
}
