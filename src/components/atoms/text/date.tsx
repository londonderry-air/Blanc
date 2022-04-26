import { zeroPadding } from '~/utils/string'
import { _Word, _TextProps } from './_text'

export const DateText = (
  props: _TextProps & {
    date?: Date | null
    defaultText?: string
  }
) => {
  const year = props.date ? zeroPadding(props.date.getFullYear(), 2) : ''
  const month = props.date ? zeroPadding(props.date.getMonth() + 1, 2) : ''
  const day = props.date ? zeroPadding(props.date.getDay(), 2) : ''
  const hours = props.date ? zeroPadding(props.date.getHours(), 2) : ''
  const minites = props.date ? zeroPadding(props.date.getMinutes(), 2) : ''
  return (
    <_Word
      size={props.size}
      weight={props.weight}
      family={props.family}
      color={props.color}
      v_space={props.v_space}
      h_space={props.h_space}
      align={props.align}
    >
      {props.date
        ? `${year}-${month}-${day} ${hours}:${minites}`
        : props.defaultText ?? '日付なし'}
    </_Word>
  )
}
