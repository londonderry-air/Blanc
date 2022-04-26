import { FlexBox } from '../atoms/box/flex'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import {
  editContentState,
  editItemParamState,
  themeColorState
} from '~/states/atoms'
import { ItemParamListItem } from './item-param-list-item'
import { Box } from '../atoms/box/box'

export const ItemParamList = () => {
  const color = useRecoilValue(themeColorState)
  const content = useRecoilValue(editContentState)
  const setItemParam = useSetRecoilState(editItemParamState)
  if (!content) return <></>

  return (
    <FlexBox
      way={'column'}
      gap={'0px'}
      padding={'0 0 10vh 0'}
      color={color.lightBorder}
      border={{
        width: '1px',
        color: color.lightBorder,
        style: 'solid'
      }}
    >
      {content.itemParams.map((param) => (
        <Box width={'100%'} key={param.id} onClick={() => setItemParam(param)}>
          <ItemParamListItem param={param} />
        </Box>
      ))}
    </FlexBox>
  )
}
