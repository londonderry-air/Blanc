import { ContentWithRelation } from '$/types/content'
import { useRef } from 'react'
import { moduler } from '~/utils/styles'
import { AnimateScrollVisibleBox } from '../animation/animate-scroll-visible-box'
import { Cluster } from '../layout/cluster'
import { HomeTextFilter } from '../molucules/home-filter-text'

export const ContentFilter = (props: {
  contents: ContentWithRelation[]
  onFiltered: (contents: ContentWithRelation[]) => void
  isFilterOpen: boolean
}) => {
  const filtered = useRef<ContentWithRelation[]>(props.contents)
  return (
    <AnimateScrollVisibleBox isVisible={props.isFilterOpen}>
      <Cluster gap={`${moduler(2)} ${moduler(8)}`}>
        <HomeTextFilter
          title={'検索'}
          subTitle={'SEARCH'}
          onInput={(str) => {
            filtered.current = str.length <= 1 
              ? props.contents 
              : props.contents.filter(c => c.name.toLocaleLowerCase()
                .includes(str.toLocaleLowerCase())
              )
            props.onFiltered(filtered.current)
          }}
        ></HomeTextFilter>
      </Cluster>
    </AnimateScrollVisibleBox>
  )
}
