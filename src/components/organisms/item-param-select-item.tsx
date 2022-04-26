import { WordListKey } from '$/types/locale'
import { ItemParamType } from '$/types/item'
import { useRecoilValue } from 'recoil'
import { localeState, themeColorState } from '~/states/atoms'
import { getLocalSentence, getLocalWord } from '~/utils/locale'
import { FlexBox } from '../atoms/box/flex'
import { _SelectListItem } from '../atoms/field/_field'
import { _Sentence, _Word } from '../atoms/text/_text'
import { moduler } from '~/utils/styles'

export const ItemParamSelectItem = (props: {
  type: ItemParamType
  onClick: (type: ItemParamType) => void
  isSelected: boolean
}) => {
  const color = useRecoilValue(themeColorState)
  const locale = useRecoilValue(localeState)
  return (
    <_SelectListItem
      background={color.border}
      border={color.lightBorder}
      isSelected={props.isSelected}
      onClick={() => props.onClick(props.type)}
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
            {getLocalWord(props.type as WordListKey, locale)}
          </_Word>
          {locale !== 'en-US' && (
            <_Word
              size={moduler(-2)}
              weight={'600'}
              color={props.isSelected ? color.cellText : color.text}
            >
              {props.type}
            </_Word>
          )}
        </FlexBox>
        <_Sentence
          size={moduler(-3)}
          weight={'500'}
          color={props.isSelected ? color.cellText : color.text}
        >
          {getParamDescription(props.type)}
        </_Sentence>
      </FlexBox>
    </_SelectListItem>
  )
}

const getParamDescription = (type: ItemParamType) => {
  switch (type) {
    case 'text':
      return getLocalSentence(
        '短い単語や文章を設定する場合は、このタイプを選択してください。'
      )
    case 'area':
      return getLocalSentence(
        '説明文など長めの文章を設定する場合は、このタイプを選択してください。'
      )
    case 'number':
      return getLocalSentence(
        '数字のみを入力するようにしたい場合、このタイプを選択してください。'
      )
    case 'date':
      return getLocalSentence(
        '日付を設定する場合は、このタイプを選択してください。'
      )
    case 'switch':
      return getLocalSentence(
        'ON/OFFの切り替えができるパラメータを設定する場合は、このタイプを選択してください。'
      )
    case 'image':
      return getLocalSentence(
        '画像ファイルを設定する場合、このタイプを選択してください。'
      )
    case 'json':
      return getLocalSentence(
        'JSON形式のデータを設定する場合は、このタイプを選択してください。'
      )
  }
}
