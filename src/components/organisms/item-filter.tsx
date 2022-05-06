import { Content } from '@prisma/client'
import { useEffect, useRef, useState } from 'react'
import { moduler } from '~/utils/styles'
import { AnimateScrollVisibleBox } from '../animation/animate-scroll-visible-box'
import { Cluster } from '../layout/cluster'
import { HomeTextFilter } from '../molucules/home-filter-text'
import { HomeSelectListFilter } from '../molucules/home-filter-selectlist'
import { ItemWithThumbnail } from '$/types/item'

export const ItemFilter = (props: {
  items: ItemWithThumbnail[]
  contents: Content[]
  onFiltered: (items: ItemWithThumbnail[]) => void
  onFilterOpen: (state: boolean) => void
  isFilterOpen: boolean
}) => {

  const filtered = useRef<ItemWithThumbnail[]>(props.items)
  const filter = useRef<{ name?: string, content?: Content }>({})
  const [isContentFilterOpen, setContentFilterState] = useState(false)

  const filterItem = (name?: string, content?: Content) => (
    props.items
      .filter(item => content 
        ? content.id === item.contentId 
        : true
      )
      .filter(item => name 
        ? name.length <= 1 
          ? true 
          : item.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()) 
        : true
      )
  )

  useEffect(() => {
    if (!props.isFilterOpen) setContentFilterState(false)
  }, [props.isFilterOpen])

  return (
    <AnimateScrollVisibleBox isVisible={props.isFilterOpen}>
      <Cluster gap={`${moduler(2)} ${moduler(4)}`}>
        <HomeTextFilter
          title={'検索'}
          subTitle={'SEARCH'}
          onInput={(str) => {
            filter.current.name = str
            filtered.current = filterItem(str, filter.current.content)
            props.onFiltered(filtered.current)
          }}
        ></HomeTextFilter>
        <HomeSelectListFilter
          title={'コンテンツ'}
          subTitle={'CONTENT'}
          list={props.contents.map((c) => c.name).concat(FILTER_NO_CONTENT)}
          onChange={(s) => {
            filter.current.content = props.contents.filter((c) => c.name === s)[0]
            filtered.current = filterItem(filter.current.name, filter.current.content)
            props.onFiltered(filtered.current)
          }}
          isOpen={isContentFilterOpen}
          onOpen={(b) => setContentFilterState(b)}
          selectedValue={filter.current.content ? filter.current.content.name : FILTER_NO_CONTENT}
        />
      </Cluster>
    </AnimateScrollVisibleBox>
  )
}

const FILTER_NO_CONTENT = '設定無し'