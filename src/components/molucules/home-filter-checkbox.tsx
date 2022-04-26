import { CheckBox } from '~/components/molucules/field-checkbox'
import { StackText } from '~/components/atoms/text/stack'
import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import styled from 'styled-components'
import { randomStr } from '~/utils/variable'

const Wrap = styled.div`
  width: fit-content;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 1em;
`

export const HomeCheckBoxFilter = (props: HeaderTextFilterProps) => {
  const color = useRecoilValue(themeColorState)
  return (
    <Wrap>
      <StackText
        top={props.local}
        bottom={props.global}
        color={color.text}
        size={-1}
      />
      <CheckBox
        id={randomStr()}
        isActive={props.isActive}
        background={color.fieldBackground}
        activeColor={color.border}
        onChange={(str) => props.onChange(str)}
      ></CheckBox>
    </Wrap>
  )
}

type HeaderTextFilterProps = {
  local: string
  global: string
  isActive: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (str: any) => void
}
