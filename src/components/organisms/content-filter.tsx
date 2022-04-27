import { Content } from '@prisma/client'
import { useRef } from 'react'
import { moduler } from '~/utils/styles'
import { AnimateScrollVisibleBox } from '../animation/animate-scroll-visible-box'
import { Cluster } from '../layout/cluster'
import { HomeTextFilter } from '../molucules/home-filter-text'

export const ContentFilter = (props: {
  contents: Content[]
  onFiltered: (contents: Content[]) => void
  isFilterOpen: boolean
}) => {
  const filtered = useRef<Content[]>(props.contents)
  return (
    <AnimateScrollVisibleBox isVisible={props.isFilterOpen}>
      <Cluster gap={`${moduler(2)} ${moduler(8)}`}>
        <HomeTextFilter
          title={'検索'}
          subTitle={'SEARCH'}
          onInput={() => props.onFiltered(filtered.current)}
        ></HomeTextFilter>
      </Cluster>
    </AnimateScrollVisibleBox>
  )
}
