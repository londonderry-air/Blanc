import { moduler } from '~/utils/styles'
import { BorderBox } from '../atoms/box/border'
import { FlexBox } from '../atoms/box/flex'
import { _Word } from '../atoms/text/_text'

export const SidebarTitle = (props: {
  local: string
  global: string
  color: string
  size?: number
}) => {
  return (
    <BorderBox
      width={'100%'}
      borderWidth={'4px'}
      borderColor={props.color}
      borderStyle={'solid'}
      borderPosition={'bottom'}
      padding={'0 0 10px 0'}
    >
      <FlexBox
        way={'row'}
        alignItems="baseline"
        gap={moduler((props.size ?? 0) - 8)}
      >
        <_Word weight={'600'} size={moduler(props.size ?? 0)}>
          {props.local}
        </_Word>
        <_Word weight={'600'} size={moduler((props.size ?? 0) - 3)}>
          {props.global}
        </_Word>
      </FlexBox>
    </BorderBox>
  )
}
