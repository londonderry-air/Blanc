import { Content, Category } from '@prisma/client'
import { useRef, useState } from 'react'
import { moduler } from '~/utils/styles'
import { AnimateScrollVisibleBox } from '../animation/animate-scroll-visible-box'
import { FlexBox } from '../atoms/box/flex'
import { Cluster } from '../layout/cluster'
import { HomeCheckBoxFilter } from '../molucules/home-filter-checkbox'
import { HomeSelectListFilter } from '../molucules/home-filter-selectlist'
import { HomeTextFilter } from '../molucules/home-filter-text'
import { getPublishState } from '~/utils/status'
import { PostWithRelation } from '$/types/post'
import { PublishStatus } from '$/types/status'

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

  const filter = useRef<{
    title?: string,
    content?: Content,
    category?: Category,
    isPublish: boolean,
    isDraft: boolean,
    isExpired: boolean,
    isComingsoon: boolean
  }>({
    isPublish: false,
    isDraft: false,
    isExpired: false,
    isComingsoon: false
  })

  const filterPost = (
    title?: string,
    content?: Content,
    category?: Category,
    isPublish?: boolean,
    isDraft?: boolean,
    isExpired?: boolean,
    isComingsoon?: boolean
  ) => (
    props.posts
      .filter(post => title 
        ? title.length >= 2 
          ? post.title.includes(title)
          : true 
        : true)
      .filter(post => content ? content.id === post.contentId : true)
      .filter(post => category ? category.id === post.categoryId : true)
      .filter(post => {
        const state = getPublishState(post)
        const filterState: PublishStatus[] = []
        if (isPublish) { filterState.push('publish') }
        if (isDraft) { filterState.push('draft') }
        if (isExpired) { filterState.push('expired') }
        if (isComingsoon) { filterState.push('comingsoon') }
        return filterState.length === 0 ? true : filterState.includes(state)
      })
  )

  return (
    <AnimateScrollVisibleBox isVisible={props.isFilterOpen}>
      <Cluster gap={`${moduler(2)} ${moduler(8)}`}>
        <HomeTextFilter
          title={'検索'}
          subTitle={'SEARCH'}
          onInput={(str) => {
            filter.current.title = str
            props.onFilter(
              filterPost(
                str,
                filter.current.content,
                filter.current.category,
                filter.current.isPublish,
                filter.current.isDraft,
                filter.current.isExpired,
                filter.current.isComingsoon
              )
            )
            console.log(filter)
          }}
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
              filter.current.isPublish = newState
              props.onFilter(
                filterPost(
                  filter.current.title,
                  filter.current.content,
                  filter.current.category,
                  filter.current.isPublish,
                  filter.current.isDraft,
                  filter.current.isExpired,
                  filter.current.isComingsoon
                )
              )
            }}
            isActive={isPublishFilterActive}
          />
          <HomeCheckBoxFilter
            local={'下書き'}
            global={'DRAFT'}
            onChange={() => {
              const newState = !isDraftFilterActive
              setDraftFilterActive(newState)
              filter.current.isDraft = newState
              props.onFilter(
                filterPost(
                  filter.current.title,
                  filter.current.content,
                  filter.current.category,
                  filter.current.isPublish,
                  filter.current.isDraft,
                  filter.current.isExpired,
                  filter.current.isComingsoon
                )
              )
            }}
            isActive={isDraftFilterActive}
          />
          <HomeCheckBoxFilter
            local={'近日公開'}
            global={'COMING SOON'}
            onChange={() => {
              const newState = !isComingsoonFilterActive
              setComingsoonFilterActive(newState)
              filter.current.isComingsoon = newState
              props.onFilter(
                filterPost(
                  filter.current.title,
                  filter.current.content,
                  filter.current.category,
                  filter.current.isPublish,
                  filter.current.isDraft,
                  filter.current.isExpired,
                  filter.current.isComingsoon
                )
              )
            }}
            isActive={isComingsoonFilterActive}
          />
          <HomeCheckBoxFilter
            local={'期限切れ'}
            global={'EXPIRED'}
            onChange={() => {
              const newState = !isExpiredFilterActive
              setExpiredFilterActive(newState)
              filter.current.isExpired = newState
              props.onFilter(
                filterPost(
                  filter.current.title,
                  filter.current.content,
                  filter.current.category,
                  filter.current.isPublish,
                  filter.current.isDraft,
                  filter.current.isExpired,
                  filter.current.isComingsoon
                )
              )
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
            selectedValue={content ? content.name : FILTER_NO_CONTENT}
            list={props.contents.map((c) => c.name).concat(FILTER_NO_CONTENT)}
            onChange={(s) => {
              const content = props.contents.some((c) => c.name === s) 
                ? props.contents.filter((c) => c.name === s)[0]
                : undefined

              const categories = props.categories.filter(
                (c) => content ? c.contentId === content.id : null
              )
              setFilterContent(content)
              setFilterCategoryList(categories)
              setFilterCategory(null)
              filter.current.content = content
              props.onFilter(
                filterPost(
                  filter.current.title,
                  filter.current.content,
                  filter.current.category,
                  filter.current.isPublish,
                  filter.current.isDraft,
                  filter.current.isExpired,
                  filter.current.isComingsoon
                )
              )
            }}
            isOpen={isContentFilterOpen}
            onOpen={(b) => setContentFilterState(b)}
          />
          <HomeSelectListFilter
            title={'カテゴリー'}
            subTitle={'CATEGORY'}
            selectedValue={category ? category.name : FILTER_NO_CONTENT}
            list={categoryList.map((c) => c.name).concat(FILTER_NO_CONTENT)}
            onChange={(s) => {
              const category = props.categories.some((c) => c.name === s) 
                ? props.categories.filter((c) => c.name === s)[0]
                : undefined
              setFilterCategory(category)
              filter.current.category = category
              props.onFilter(
                filterPost(
                  filter.current.title,
                  filter.current.content,
                  filter.current.category,
                  filter.current.isPublish,
                  filter.current.isDraft,
                  filter.current.isExpired,
                  filter.current.isComingsoon
                )
              )
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
  posts: PostWithRelation[]
  contents: Content[]
  categories: Category[]
  onFilter: (posts: PostWithRelation[]) => void
  onFilterOpen: (state: boolean) => void
}

const FILTER_NO_CONTENT = '設定無し'