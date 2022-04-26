import { BlancFile, Content, Item } from '$/node_modules/@prisma/client'
import { useEffect, useRef, useState } from 'react'
import { moduler } from '~/utils/styles'
import { AnimateScrollVisibleBox } from '../animation/animate-scroll-visible-box'
import { Cluster } from '../layout/cluster'
import { HomeTextFilter } from '../molucules/home-filter-text'
import { HomeSelectListFilter } from '../molucules/home-filter-selectlist'

export const ItemFilter = (props: {
  items: (Item & {
    thumbnail: BlancFile | null
  })[]
  contents: Content[]
  onFiltered: (items: Item[]) => void
  onFilterOpen: (state: boolean) => void
  isFilterOpen: boolean
}) => {
  const filtered = useRef<Item[]>(props.items)
  const [content, setFilterContent] = useState<Content>()
  const [isContentFilterOpen, setContentFilterState] = useState(false)

  useEffect(() => {
    if (!props.isFilterOpen) setContentFilterState(false)
  }, [props.isFilterOpen])

  return (
    <AnimateScrollVisibleBox isVisible={props.isFilterOpen}>
      <Cluster gap={`${moduler(2)} ${moduler(4)}`}>
        <HomeTextFilter
          title={'検索'}
          subTitle={'SEARCH'}
          onInput={() => props.onFiltered(filtered.current)}
        ></HomeTextFilter>
        <HomeSelectListFilter
          title={'コンテンツ'}
          subTitle={'CONTENT'}
          list={props.contents.map((c) => c.name)}
          onChange={(s) => {
            setFilterContent(props.contents.filter((c) => c.name === s)[0])
            props.onFiltered(filtered.current)
          }}
          isOpen={isContentFilterOpen}
          onOpen={(b) => setContentFilterState(b)}
          selectedValue={content ? content.name : content}
        />
      </Cluster>
    </AnimateScrollVisibleBox>
  )
}
