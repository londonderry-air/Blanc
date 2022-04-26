import { ContentWithRelation } from '$/types/content'
import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { FitScreenBox } from '../atoms/box/fit-screen'
import { FlexBox } from '../atoms/box/flex'
import { ContentListItem } from './content-list-item'

export const ContentList = (props: ContentListProps) => {
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
          width: '1px',
          style: 'solid',
          color: color.lightBorder
        }}
      >
        {props.contents.map((content) => (
          <ContentListItem key={content.id} content={content} />
        ))}
      </FlexBox>
    </FitScreenBox>
  )
}

type ContentListProps = {
  contents: ContentWithRelation[]
  isFilterOpen: boolean
}
