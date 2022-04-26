import { Category } from '$/node_modules/@prisma/client'
import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { FlexBox } from '../atoms/box/flex'
import { CategoryListItem } from './category-list-item'
import { Box } from '../atoms/box/box'

export const CategoryList = (props: CategoryListProps) => {
  const color = useRecoilValue(themeColorState)
  return (
    <FlexBox
      way={'column'}
      gap={'0em'}
      border={{
        width: '1px',
        style: 'solid',
        color: color.lightBorder
      }}
    >
      {props.categories.map((category) => (
        <Box
          key={category.id}
          width={'100%'}
          onClick={() => props.onSelect(category)}
        >
          <CategoryListItem category={category} />
        </Box>
      ))}
    </FlexBox>
  )
}

type CategoryListProps = {
  categories: Category[]
  onSelect: (category: Category) => void
}
