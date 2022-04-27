import { BlancFile } from '@prisma/client'
import { randomStr } from '~/utils/variable'
import { _ElementImage } from './_element-image'

export const BlancElementImage = (props: {
  width: string
  height: string
  data: BlancImageElementProps
}) => {
  if (!props.data.file) {
    props.data.file = {
      id: randomStr(),
      name: '',
      url: null,
      size: 0,
      width: 0,
      height: 0,
      created: new Date(),
      updated: new Date(),
      deleted: null,
      dataURL: null
    }
  }
  return (
    <_ElementImage
      file={props.data.file}
      width={props.width}
      height={props.height}
      isFitImage={true}
      fitBase={'width'}
      onChange={(file) => (props.data.file = file)}
    />
  )
}

export type BlancImageElementProps = {
  file?: BlancFile
}
