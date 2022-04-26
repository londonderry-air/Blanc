import { moduler } from '~/utils/styles'
import { FlexBox } from '../box/flex'
import { _Word } from './_text'

export const StackText = (props: {
  top: string
  bottom?: string
  color: string
  isCenter?: boolean
  size?: number
  // locale?: Locale
}) => {
  // props variable
  const top = props.top
  const bottom = props.bottom
  const color = props.color
  const isCenter = props.isCenter ?? true
  const topSize = props.size ? moduler(props.size) : moduler(0)
  const bottomSize = props.size ? moduler(props.size - 3) : moduler(-3)
  // const locale = props.locale ?? 'ja-JP';

  return (
    <FlexBox
      way="column"
      alignItems={isCenter ? 'center' : 'baseline'}
      gap={'0'}
    >
      <_Word
        size={topSize}
        weight={'700'}
        align={isCenter ? 'center' : 'left'}
        color={color}
      >
        {top}
      </_Word>
      {bottom && (
        <_Word
          size={bottomSize}
          weight={'600'}
          align={isCenter ? 'center' : 'left'}
          color={color}
        >
          {bottom}
        </_Word>
      )}
    </FlexBox>
  )
}
