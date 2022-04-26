import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { moduler } from '~/utils/styles'
import { StackText } from '../atoms/text/stack'
import { FlexBox } from '../atoms/box/flex'
import { _Word } from '../atoms/text/_text'
import { Box } from '../atoms/box/box'
import { BorderBox } from '../atoms/box/border'
import { Select } from './field-select'
import { getTimeText, getLastDayOfMonth } from '~/utils/date'
import { zeroPadding } from '~/utils/string'
import { Button } from '../atoms/button/button'

export const TimePicker = (props: {
  defaultValue?: Date | null
  isEnableEmpty?: boolean
  onSelect: (d: Date | null) => void
}) => {
  const color = useRecoilValue(themeColorState)
  const [date, setNewDate] = useState<Date | null>(props.defaultValue ?? null)
  const setDate = (date: Date | null) => {
    setNewDate(date)
  }

  useEffect(() => {
    props.onSelect(date)
  }, [date])

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
            Time Picker
          </_Word>
        </BorderBox>
        <BorderBox
          borderPosition={'bottom'}
          borderWidth={'2px'}
          borderStyle={'solid'}
          borderColor={color.border}
          width={'100%'}
          padding={'20px 10px'}
        >
          <FlexBox
            width={'100%'}
            way={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <FlexBox
              width={'100%'}
              way={'row'}
              alignItems={'center'}
              gap={'1em'}
            >
              <StackText
                top={'日付'}
                bottom={'DATE'}
                size={-3}
                color={color.text}
              />
              <_Word color={color.text} weight={'600'} size={moduler(2)}>
                {date ? getTimeText(date) : '設定日なし'}
              </_Word>
            </FlexBox>
            <WeekOfDay date={date} />
          </FlexBox>
        </BorderBox>
        <FlexBox
          width={'100%'}
          way={'row'}
          alignItems={'bottom'}
          padding={'20px 10px'}
          justifyContent={'space-between'}
        >
          <FlexBox
            way={'row'}
            alignItems={'center'}
            gap={'8px 24px'}
            wrap={'wrap'}
          >
            <FlexBox way={'row'} alignItems={'center'} gap={'8px'}>
              <YearPicker date={date} onSelect={(d) => setDate(d)} />
              <MonthPicker date={date} onSelect={(d) => setDate(d)} />
              <DayPicker date={date} onSelect={(d) => setDate(d)} />
            </FlexBox>
            <FlexBox way={'row'} alignItems={'center'} gap={'8px'}>
              <HoursPicker date={date} onSelect={(d) => setDate(d)} />
              <MinutesPicker date={date} onSelect={(d) => setDate(d)} />
            </FlexBox>
          </FlexBox>
          {props.isEnableEmpty && (
            <Button
              title={'リセット'}
              color={color.caution}
              onClick={() => setDate(null)}
            />
          )}
        </FlexBox>
      </FlexBox>
    </BorderBox>
  )
}

export const YearPicker = (props: {
  date: Date | null
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
        selected={props.date ? props.date.getFullYear() : null}
        onSelect={(e) => {
          if (!props.date) {
            const newDate = new Date(e as number, 0)
            props.onSelect(newDate)
            return
          }
          const newDate = new Date(
            e as number,
            props.date.getMonth(),
            props.date.getDate(),
            props.date.getHours(),
            props.date.getMinutes()
          )
          console.log(newDate)
          props.onSelect(newDate)
        }}
        onOpen={() => console.log('')}
        style={{
          listWidth: '16ch'
        }}
      />
    </Box>
  )
}

export const MonthPicker = (props: {
  date: Date | null
  onSelect: (date: Date) => void
}) => {
  const [isOpen, setOpen] = useState(false)
  const isNotExistDate = (newDate: Date, date: number) => {
    return date > getLastDayOfMonth(newDate).getDate()
  }
  return (
    <Box onClick={() => setOpen(!isOpen)}>
      <Select
        list={[
          '01',
          '02',
          '03',
          '04',
          '05',
          '06',
          '07',
          '08',
          '09',
          '10',
          '11',
          '12'
        ]}
        placeholder={'--'}
        selected={props.date ? zeroPadding(props.date.getMonth() + 1, 2) : null}
        isOpen={isOpen}
        onSelect={(e) => {
          if (!props.date) {
            const now = new Date()
            const newDate = new Date(now.getFullYear(), (e as number) - 1)
            props.onSelect(newDate)
            return
          }
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
              props.date.getDate(),
              props.date.getHours(),
              props.date.getMinutes()
            )
            props.onSelect(newDate)
          }

          // props.onSelect(newDate)
        }}
        onOpen={() => console.log('')}
        style={{
          listWidth: '10ch'
        }}
      />
    </Box>
  )
}

export const DayPicker = (props: {
  date: Date | null
  onSelect: (date: Date) => void
}) => {
  const [isOpen, setOpen] = useState(false)
  return (
    <Box onClick={() => setOpen(!isOpen)}>
      <Select
        list={
          props.date
            ? Array.from(
                { length: getLastDayOfMonth(props.date).getDate() },
                (_, i) => zeroPadding(1 + i, 2)
              )
            : ['--']
        }
        placeholder={'--'}
        selected={props.date ? zeroPadding(props.date.getDate(), 2) : null}
        isOpen={isOpen}
        onSelect={(e) => {
          if (!props.date) {
            const now = new Date()
            const newDate = new Date(
              now.getFullYear(),
              now.getMonth(),
              (e as number) - 1
            )
            props.onSelect(newDate)
            return
          }
          const newDate = new Date(
            props.date.getFullYear(),
            props.date.getMonth(),
            e as number,
            props.date.getHours(),
            props.date.getMinutes()
          )
          console.log(newDate)
          props.onSelect(newDate)
        }}
        onOpen={() => console.log('')}
        style={{
          listWidth: '10ch'
        }}
      />
    </Box>
  )
}

export const HoursPicker = (props: {
  date: Date | null
  onSelect: (date: Date) => void
}) => {
  const [isOpen, setOpen] = useState(false)
  return (
    <Box onClick={() => setOpen(!isOpen)}>
      <Select
        list={Array.from({ length: 24 }, (_, i) => zeroPadding(i, 2))}
        placeholder={'--'}
        selected={props.date ? zeroPadding(props.date.getHours(), 2) : null}
        isOpen={isOpen}
        onSelect={(e) => {
          if (!props.date) {
            const now = new Date()
            const newDate = new Date(
              now.getFullYear(),
              now.getMonth(),
              now.getDate(),
              (e as number) - 1
            )
            props.onSelect(newDate)
            return
          }
          const newDate = new Date(
            props.date.getFullYear(),
            props.date.getMonth(),
            props.date.getDate(),
            e as number,
            props.date.getMinutes()
          )
          console.log(newDate)
          props.onSelect(newDate)
        }}
        onOpen={() => console.log('')}
        style={{
          listWidth: '10ch'
        }}
      />
    </Box>
  )
}

export const MinutesPicker = (props: {
  date: Date | null
  onSelect: (date: Date) => void
}) => {
  const [isOpen, setOpen] = useState(false)
  return (
    <Box onClick={() => setOpen(!isOpen)}>
      <Select
        list={Array.from({ length: 60 }, (_, i) => zeroPadding(i, 2))}
        placeholder={'--'}
        selected={props.date ? zeroPadding(props.date.getMinutes(), 2) : '--'}
        isOpen={isOpen}
        onSelect={(e) => {
          if (!props.date) {
            const now = new Date()
            const newDate = new Date(
              now.getFullYear(),
              now.getMonth(),
              now.getDate(),
              now.getHours(),
              (e as number) - 1
            )
            props.onSelect(newDate)
            return
          }
          const newDate = new Date(
            props.date.getFullYear(),
            props.date.getMonth(),
            props.date.getDate(),
            props.date.getHours(),
            e as number
          )
          console.log(newDate)
          props.onSelect(newDate)
        }}
        onOpen={() => console.log('')}
        style={{
          listWidth: '10ch'
        }}
      />
    </Box>
  )
}

export const WeekOfDay = (props: { date: Date | null }) => {
  const color = useRecoilValue(themeColorState)
  const getDayText = (date: Date | null) => {
    switch (date ? date.getDay() : 999) {
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
