import { BorderBox } from '../atoms/box/border'
import { StackText } from '../atoms/text/stack'

export const FieldTitle = (props: {
  title: string
  subTitle?: string
  text: {
    color: string
  }
  border: {
    color: string
    width: string
  }
  size?: number
}) => {
  const size = props.size ?? 0
  return (
    <BorderBox
      borderPosition="left"
      borderColor={props.border.color}
      borderStyle={'solid'}
      borderWidth={props.border.width ?? '1px'}
      padding={`0 0 0 ${8 + size}px`}
    >
      <StackText
        top={props.title}
        bottom={props.subTitle}
        color={props.text.color}
        isCenter={false}
        size={props.size}
      />
    </BorderBox>
  )
}
