import { Content } from '$/node_modules/@prisma/client'
import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { moduler } from '~/utils/styles'
import { FlexBox } from '../atoms/box/flex'
import { _SelectListItem } from '../atoms/field/_field'
import { _Word } from '../atoms/text/_text'

export const ModalContentSelectItem = (props: {
  content: Content
  isSelected: boolean
  onSelect: (c: Content) => void
}) => {
  const color = useRecoilValue(themeColorState)
  return (
    <_SelectListItem
      background={color.border}
      border={color.lightBorder}
      isSelected={props.isSelected}
      onClick={() => props.onSelect(props.content)}
      padding={`${moduler(1)} ${moduler(-2)}`}
    >
      <FlexBox way={'column'} alignItems={'flex-start'} gap={'0.5em'}>
        <FlexBox
          way={'row'}
          alignItems={'center'}
          justifyContent={'flex-start'}
          gap={'6px'}
        >
          <_Word
            size={moduler(-1)}
            weight={'600'}
            color={props.isSelected ? color.cellText : color.text}
          >
            {props.content.name.toUpperCase()}
          </_Word>
        </FlexBox>
      </FlexBox>
    </_SelectListItem>
  )
}
