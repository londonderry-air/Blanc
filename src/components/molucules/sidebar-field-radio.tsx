import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { FieldTitle } from './field-title'
import { FieldDesc } from './field-description'
import { moduler } from '~/utils/styles'
import { Box } from '../layout/box'
import { useState } from 'react'
import { FlexBox } from '../atoms/box/flex'
import { CheckBox } from './field-checkbox'
import { _Word } from '../atoms/text/_text'
import { randomStr } from '~/utils/variable'

export const SideRadioField = (props: {
  title: string
  subTitle?: string
  description?: string
  selectedValue?: string
  values: string[]
  onChange: (str: string) => void
}) => {
  const color = useRecoilValue(themeColorState)
  const [selected, setSelected] = useState<string | null>(
    props.selectedValue ?? null
  )
  return (
    <Box width={'100%'}>
      <FlexBox way={'column'} gap={'1em'}>
        <FieldTitle
          title={props.title}
          subTitle={props.subTitle}
          text={{ color: color.text }}
          border={{
            color: color.border,
            width: '4px'
          }}
          size={-2}
        />
        {props.description && (
          <FieldDesc
            color={color.grayText}
            description={props.description}
            size={-4}
          />
        )}
        <FlexBox way={'column'} gap={moduler(-2)}>
          {props.values.map((value, i) => (
            <FlexBox key={i} way={'row'} gap={'1em'} alignItems={'center'}>
              <CheckBox
                id={randomStr()}
                isActive={selected === value}
                background={color.fieldBackground}
                activeColor={color.border}
                onChange={() => {
                  setSelected(value)
                  props.onChange(value)
                }}
              />
              <_Word weight={'600'} size={moduler(-2)}>
                {value}
              </_Word>
            </FlexBox>
          ))}
        </FlexBox>
      </FlexBox>
    </Box>
  )
}
