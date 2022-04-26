import { useRecoilValue } from 'recoil'
import { Cluster } from '~/components/layout/cluster'
import { themeColorState } from '~/states/atoms'
import { moduler } from '~/utils/styles'
import { BorderBox } from '../box/border'
import { FlexBox } from '../box/flex'
import { _Word } from './_text'

export const LabelText = (props: {
  label: string
  value: string
  color?: string
  size?: number
}) => {
  const color = useRecoilValue(themeColorState)
  return (
    <BorderBox
      borderPosition={'left'}
      borderWidth={'2px'}
      borderStyle={'solid'}
      borderColor={props.color ?? color.text}
      padding={'0 0 0 4px'}
    >
      <FlexBox way={'row'} alignItems={'center'} gap={'4px'}>
        <_Word
          size={moduler(props.size ?? -3)}
          weight={'600'}
          color={props.color ?? color.text}
        >
          {props.label}
        </_Word>
        <_Word
          size={moduler(props.size ?? -3)}
          weight={'600'}
          align={'center'}
          color={props.color ?? color.text}
        >
          :
        </_Word>
        <_Word
          size={moduler(props.size ?? -2)}
          weight={'600'}
          color={props.color ?? color.text}
        >
          {props.value}
        </_Word>
      </FlexBox>
    </BorderBox>
  )
}

export const LabelTextList = (props: {
  list: { label: string; value: string }[]
  color?: string
}) => {
  return (
    <Cluster>
      {props.list.map((info, i) => (
        <LabelText
          key={i}
          label={info.label}
          value={info.value}
          color={props.color}
        />
      ))}
    </Cluster>
  )
}
