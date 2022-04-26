import { ThemeColor } from '$/types/color'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { themeColorState } from '~/states/atoms'
import { moduler } from '~/utils/styles'
import { Button } from '../atoms/button/button'
import { StackText } from '../atoms/text/stack'
import { FlexBox } from '../atoms/box/flex'
import { _Word } from '../atoms/text/_text'
import { Box } from '../atoms/box/box'
import { Cluster } from '../layout/cluster'
import { Stack } from '../layout/stack'
import { BorderBox } from '../atoms/box/border'
import { Select } from './field-select'
import { getLastDayOfMonth } from '~/utils/date'
import { getCombinedNodeFlags } from 'typescript'

export const DatePicker = () => {
  const color = useRecoilValue(themeColorState)
  const [date, setDate] = useState(new Date())
  return (
    <BorderBox
      borderPosition={'all'}
      borderWidth={'2px'}
      borderColor={color.border}
      borderStyle={'solid'}
      width={'100%'}
      radius={'10px'}
    >
      <FlexBox width={'100%'} way={'column'}>
        <BorderBox
          borderPosition={'bottom'}
          borderWidth={'2px'}
          borderStyle={'solid'}
          borderColor={color.border}
          background={color.text}
          width={'100%'}
          padding={'10px 10px'}
        >
          <_Word color={color.cellText} weight={'600'} size={moduler(-3)}>
            Date Picker
          </_Word>
        </BorderBox>
        <FlexBox
          width={'100%'}
          way={'row'}
          alignItems={'bottom'}
          padding={'20px 10px'}
          justifyContent={'space-between'}
        >
          <FlexBox way={'row'} alignItems={'center'} gap={'8px'}>
            <YearPicker date={date} onSelect={(d) => setDate(d)} />
            <MonthPicker date={date} onSelect={(d) => setDate(d)} />
            <DayPicker date={date} onSelect={(d) => setDate(d)} />
          </FlexBox>
          <WeekOfDay date={date} />
        </FlexBox>
      </FlexBox>
    </BorderBox>
  )
}

export const YearPicker = (props: {
  date: Date
  onSelect: (date: Date) => void
}) => {
  const today = new Date()
  const [isOpen, setOpen] = useState(false)
  return (
    <Box onClick={() => setOpen(!isOpen)}>
      <Select
        list={Array.from({ length: 6 }, (_, i) => today.getFullYear() + 3 - i)}
        placeholder={'----'}
        isOpen={isOpen}
        selected={props.date.getFullYear()}
        onSelect={(e) => {
          const newDate = new Date(
            e as number,
            props.date.getMonth(),
            props.date.getDate()
          )
          console.log(newDate)
          props.onSelect(newDate)
        }}
        onOpen={() => console.log('')}
      />
    </Box>
  )
}

export const DayPicker = (props: {
  date: Date
  onSelect: (date: Date) => void
}) => {
  const lastDayOfMonth = getLastDayOfMonth(props.date)
  const [isOpen, setOpen] = useState(false)
  return (
    <Box onClick={() => setOpen(!isOpen)}>
      <Select
        list={Array.from({ length: lastDayOfMonth.getDate() }, (_, i) => 1 + i)}
        placeholder={'--'}
        selected={props.date.getDate()}
        isOpen={isOpen}
        onSelect={(e) => {
          const newDate = new Date(
            props.date.getFullYear(),
            props.date.getMonth(),
            e as number
          )
          console.log(newDate)
          props.onSelect(newDate)
        }}
        onOpen={() => console.log('')}
      />
    </Box>
  )
}

export const MonthPicker = (props: {
  date: Date
  onSelect: (date: Date) => void
}) => {
  const [isOpen, setOpen] = useState(false)
  const isNotExistDate = (newDate: Date, date: number) => {
    return date > getLastDayOfMonth(newDate).getDate()
  }
  return (
    <Box onClick={() => setOpen(!isOpen)}>
      <Select
        list={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
        placeholder={'--'}
        selected={props.date.getMonth() + 1}
        isOpen={isOpen}
        onSelect={(e) => {
          const dateForMonthCheck = new Date(
            props.date.getFullYear(),
            (e as number) - 1
          )
          if (isNotExistDate(dateForMonthCheck, props.date.getDate())) {
            const newDate = new Date(
              props.date.getFullYear(),
              (e as number) - 1,
              getLastDayOfMonth(dateForMonthCheck).getDate()
            )
            props.onSelect(newDate)
          } else {
            const newDate = new Date(
              props.date.getFullYear(),
              (e as number) - 1,
              props.date.getDate()
            )
            props.onSelect(newDate)
          }

          // props.onSelect(newDate)
        }}
        onOpen={() => console.log('')}
      />
    </Box>
  )
}

export const WeekOfDay = (props: { date: Date }) => {
  const color = useRecoilValue(themeColorState)
  const getDayText = (date: Date) => {
    switch (date.getDay()) {
      case 0:
        return { title: '日', subTitle: 'SUN' }
      case 1:
        return { title: '月', subTitle: 'MON' }
      case 2:
        return { title: '火', subTitle: 'TUE' }
      case 3:
        return { title: '水', subTitle: 'WED' }
      case 4:
        return { title: '木', subTitle: 'THR' }
      case 5:
        return { title: '金', subTitle: 'FRI' }
      case 6:
        return { title: '土', subTitle: 'SAT' }
      default:
        return { title: '-', subTitle: '---' }
    }
  }
  const dayText = getDayText(props.date)
  return (
    <BorderBox
      padding={'3px 10px'}
      radius={'4px'}
      borderPosition={'all'}
      borderWidth={'2px'}
      borderColor={color.text}
      background={color.text}
      borderStyle={'solid'}
    >
      <StackText
        top={dayText.title}
        bottom={dayText.subTitle}
        size={-3}
        color={color.cellText}
      />
    </BorderBox>
  )
}
