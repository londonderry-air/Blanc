import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { moduler } from '~/utils/styles'
import {
  _Selecting,
  _SelectList,
  _SelectListItem,
  _SelectingWrap
} from '../atoms/field/_field'
import { _Word } from '../atoms/text/_text'

export const Select = (props: {
  list: string[] | number[]
  placeholder: string | number
  selected?: string | number | null
  onSelect: (value: string | number) => void
  onOpen: (state: boolean) => void
  isOpen: boolean
  style?: {
    listWidth?: string
  }
}) => {
  const color = useRecoilValue(themeColorState)
  return (
    <div style={{ position: 'relative' }}>
      <_SelectingWrap
        color={color.border}
        onClick={() => props.onOpen(!props.isOpen)}
      >
        <_Selecting color={color.border}>
          <_Word weight="600" size={moduler(-2)} color={color.text}>
            {props.selected ?? props.placeholder}
          </_Word>
        </_Selecting>
      </_SelectingWrap>
      <_SelectList
        background={color.background}
        border={color.border}
        isOpen={props.isOpen}
        width={props.style?.listWidth}
      >
        {props.list.map((item, i) => (
          <_SelectListItem
            key={i}
            background={color.border}
            border={color.border}
            isSelected={props.selected === item}
            onClick={() => props.onSelect(item)}
          >
            <_Word
              weight="600"
              size={moduler(-3)}
              color={props.selected === item ? color.cellText : color.text}
            >
              {item}
            </_Word>
          </_SelectListItem>
        ))}
      </_SelectList>
    </div>
  )
}
