import { Content, Item, BlancFile } from '$/node_modules/@prisma/client'
import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { FlexBox } from '../atoms/box/flex'
import { FitScreenBox } from '../atoms/box/fit-screen'
import { ItemListItem } from './item-list-item'

export const ItemList = (props: ItemListProps) => {
  const color = useRecoilValue(themeColorState)
  return (
    <FitScreenBox
      borderTop={{
        color: color.lightBorder,
        width: '1px',
        style: 'solid'
      }}
      forceRefresh={props.isFilterOpen}
      forceRefreshDelay={200}
    >
      <FlexBox
        way={'column'}
        border={{
          color: color.lightBorder,
          style: 'solid',
          width: '1px'
        }}
      >
        {props.items.map((item) => (
          <ItemListItem
            key={item.id}
            item={item}
            content={props.contents.filter((c) => c.id === item.contentId)[0]}
          />
        ))}
      </FlexBox>
    </FitScreenBox>
  )
}

type ItemListProps = {
  items: (Item & {
    thumbnail: BlancFile | null
  })[]
  contents: Content[]
  isFilterOpen: boolean
}
