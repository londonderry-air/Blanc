import { Content, Category } from '@prisma/client'
import { PublishStatus } from '$/types/status'
import { useState } from 'react'
import { moduler } from '~/utils/styles'
import { AnimateScrollVisibleBox } from '../animation/animate-scroll-visible-box'
import { FlexBox } from '../atoms/box/flex'
import { Cluster } from '../layout/cluster'
import { HomeCheckBoxFilter } from '../molucules/home-filter-checkbox'
import { HomeSelectListFilter } from '../molucules/home-filter-selectlist'
import { HomeTextFilter } from '../molucules/home-filter-text'

export const PostFilter = (props: PostFilterProps) => {
  const [content, setFilterContent] = useState<Content>()
  const [category, setFilterCategory] = useState<Category | null>()
  const [categoryList, setFilterCategoryList] = useState<Category[]>([])
  const [isPublishFilterActive, setPublishFilterActive] = useState(false)
  const [isDraftFilterActive, setDraftFilterActive] = useState(false)
  const [isExpiredFilterActive, setExpiredFilterActive] = useState(false)
  const [isComingsoonFilterActive, setComingsoonFilterActive] = useState(false)
  const [isContentFilterOpen, setContentFilterState] = useState(false)
  const [isCategoryFilterOpen, setCategoryFilterState] = useState(false)
  return (
    <AnimateScrollVisibleBox isVisible={props.isFilterOpen}>
      <Cluster gap={`${moduler(2)} ${moduler(8)}`}>
        <HomeTextFilter
          title={'検索'}
          subTitle={'SEARCH'}
          onInput={(e) => props.onSearchInput(e)}
        ></HomeTextFilter>
        <FlexBox
          way={'row'}
          gap={moduler(4)}
          wrap={'nowrap'}
          alignItems={'center'}
        >
          <HomeCheckBoxFilter
            local={'公開中'}
            global={'PUBLISH'}
            onChange={() => {
              const newState = !isPublishFilterActive
              setPublishFilterActive(newState)
              props.onPublishStateChange('publish', newState)
            }}
            isActive={isPublishFilterActive}
          />
          <HomeCheckBoxFilter
            local={'下書き'}
            global={'DRAFT'}
            onChange={() => {
              const newState = !isDraftFilterActive
              setDraftFilterActive(newState)
              props.onPublishStateChange('draft', newState)
            }}
            isActive={isDraftFilterActive}
          />
          <HomeCheckBoxFilter
            local={'近日公開'}
            global={'COMING SOON'}
            onChange={() => {
              const newState = !isComingsoonFilterActive
              setComingsoonFilterActive(newState)
              props.onPublishStateChange('comingsoon', newState)
            }}
            isActive={isComingsoonFilterActive}
          />
          <HomeCheckBoxFilter
            local={'期限切れ'}
            global={'EXPIRED'}
            onChange={() => {
              const newState = !isExpiredFilterActive
              setExpiredFilterActive(newState)
              props.onPublishStateChange('expired', newState)
            }}
            isActive={isExpiredFilterActive}
          />
        </FlexBox>
        <FlexBox
          way={'row'}
          wrap={'nowrap'}
          alignItems={'center'}
          gap={moduler(4)}
        >
          <HomeSelectListFilter
            title={'コンテンツ'}
            subTitle={'CONTENT'}
            selectedValue={content ? content.name : '-'}
            list={props.contents.map((c) => c.name)}
            onChange={(s) => {
              const content = props.contents.filter((c) => c.name === s)[0]
              const categories = props.categories.filter(
                (c) => c.contentId === content.id
              )
              setFilterContent(content)
              setFilterCategoryList(categories)
              setFilterCategory(null)
              props.onContentChange(content)
            }}
            isOpen={isContentFilterOpen}
            onOpen={(b) => setContentFilterState(b)}
          />
          <HomeSelectListFilter
            title={'カテゴリー'}
            subTitle={'CATEGORY'}
            selectedValue={category ? category.name : '-'}
            list={categoryList.map((c) => c.name)}
            onChange={(s) => {
              const category = props.categories.filter((c) => c.name === s)[0]
              setFilterCategory(category)
              props.onCategoryChange(category)
            }}
            isOpen={isCategoryFilterOpen}
            onOpen={(b) => setCategoryFilterState(b)}
          />
        </FlexBox>
      </Cluster>
    </AnimateScrollVisibleBox>
  )
}

type PostFilterProps = {
  isFilterOpen: boolean
  contents: Content[]
  categories: Category[]
  onSearchInput: (keyword: string) => void
  onPublishStateChange: (publishStatus: PublishStatus, state: boolean) => void
  onContentChange: (content: Content) => void
  onCategoryChange: (category: Category) => void
  onFilterOpen: (state: boolean) => void
}
