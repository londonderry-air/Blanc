import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { HomeBox } from '../molucules/home-box'
import { ContentFilter } from '../organisms/content-filter'
import { ContentList } from '../organisms/content-list'
import { HomeHeader } from '../molucules/home-header'
import { ContentWithRelation } from '$/types/content'

export const ContentHome = (props: {
  contents: ContentWithRelation[]
  onCreate: () => void
}) => {
  const color = useRecoilValue(themeColorState)
  const [contents, setContents] = useState<ContentWithRelation[]>(props.contents)
  const [isFilterOpen, setFilterOpen] = useState(false)
  return (
    <HomeBox>
      <HomeHeader
        title="コンテンツ"
        subTitle="CONTENT"
        buttons={[
          {
            title: 'フィルター',
            subTitle: 'FILTER',
            color: isFilterOpen ? color.text : color.lightInactive,
            colors: {
              background: color.background,
              border: isFilterOpen ? color.text : color.fieldBackground,
              text: isFilterOpen ? color.text : color.fieldBackground
            },
            onClick: () => setFilterOpen(!isFilterOpen)
          },
          {
            title: '新規作成',
            subTitle: 'CREATE',
            color: color.text,
            onClick: () => props.onCreate()
          }
        ]}
      />
      <ContentFilter
        isFilterOpen={isFilterOpen}
        contents={props.contents}
        onFiltered={(contents) => setContents(contents)}
      ></ContentFilter>
      <ContentList contents={contents} isFilterOpen={isFilterOpen} />
    </HomeBox>
  )
}
