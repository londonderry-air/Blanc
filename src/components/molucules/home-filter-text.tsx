import { Input } from '~/components/molucules/field-input'
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

export const HomeTextFilter = (props: {
  title: string
  subTitle: string
  onInput: (str: string) => void
}) => {
  const color = useRecoilValue(themeColorState)
  return (
    <Wrap>
      <StackText
        top={props.title}
        bottom={props.subTitle}
        color={color.text}
        size={-1}
      ></StackText>
      <Input width="40ch" onInput={props.onInput}></Input>
    </Wrap>
  )
}
