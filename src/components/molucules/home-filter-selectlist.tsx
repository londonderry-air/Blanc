import { Select } from '~/components/molucules/field-select'
import { StackText } from '~/components/atoms/text/stack'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'

const Wrap = styled.div`
  width: fit-content;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 1em;
`

export const HomeSelectListFilter = (props: {
  title: string
  subTitle: string
  list: string[]
  placeholder?: string
  selectedValue?: string
  isOpen: boolean
  onOpen: (state: boolean) => void
  onChange: (value: string | number) => void
}) => {
  const color = useRecoilValue(themeColorState)
  const defaultPlaceholder = '-'
  return (
    <Wrap>
      <StackText
        top={props.title}
        bottom={props.subTitle}
        color={color.text}
        size={-1}
      />
      <Select
        list={props.list}
        placeholder={props.placeholder ?? defaultPlaceholder}
        isOpen={props.isOpen}
        selected={props.selectedValue}
        onSelect={(value) => props.onChange(value)}
        onOpen={props.onOpen}
      ></Select>
    </Wrap>
  )
}
