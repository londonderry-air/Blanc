import { HomeHeader } from '~/components/molucules/home-header'
import { useRecoilState, useRecoilValue } from 'recoil'
import { modalState, themeColorState } from '~/states/atoms'
import { useEffect, useState } from 'react'
import { PostList } from '~/components/organisms/post-list'
import { PostFilter } from '~/components/organisms/post-filter'
import { Content, Category } from '@prisma/client'
import { HomeBox } from '../molucules/home-box'
import { ModalContentSelect } from '../organisms/modal-content-select'
import { ButtonProps } from '$/types/element'
import { PostWithRelation } from '$/types/post'

export const PostHome = (props: PostTopProps) => {
  const color = useRecoilValue(themeColorState)
  const [content, setContent] = useState<Content | null>(null)
  const [isFilterOpen, setFilterOpen] = useState(false)
  const [modal, setModal] = useRecoilState(modalState)
  const getModalButton = (isActive: boolean): ButtonProps[] => [
    {
      title: '新規作成',
      subTitle: 'CREATE',
      color: color.text,
      isInactive: !isActive,
      onClick: () => {
        if (content) {
          props.onCreate(content)
        }
        setModal({ title: modal.title, isVisible: false })
        setContent(null)
      }
    }
  ]

  useEffect(() => {
    if (!content) return
    setModal({
      title: '投稿を作成する',
      subTitle: 'Create New Item Post',
      isVisible: true,
      buttons: getModalButton(true),
      onClose: () => setContent(null),
      children: (
        <ModalContentSelect
          contents={props.contents}
          onSelect={(c) => {
            setContent(c)
          }}
        />
      )
    })
  }, [content])

  return (
    <HomeBox>
      <HomeHeader
        title="投稿"
        subTitle="POST"
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
            onClick: () =>
              setModal({
                title: '投稿を作成する',
                subTitle: 'Create New Item Post',
                isVisible: true,
                buttons: getModalButton(false),
                onClose: () => setContent(null),
                children: (
                  <ModalContentSelect
                    contents={props.contents}
                    onSelect={(c) => {
                      setContent(c)
                    }}
                  />
                )
              })
          }
        ]}
      />
      <PostFilter
        isFilterOpen={isFilterOpen}
        contents={props.contents}
        categories={props.categories}
        onSearchInput={(kw) => console.log(kw)}
        onPublishStateChange={(ps, state) => {
          console.log(`PublishState: ${ps}, State: ${state}`)
        }}
        onContentChange={(c) => console.log(c)}
        onCategoryChange={(c) => console.log(c)}
        onFilterOpen={(b) => setFilterOpen(b)}
      ></PostFilter>
      <PostList
        posts={props.posts}
        contents={props.contents}
        categories={props.categories}
        isFilterOpen={isFilterOpen}
      ></PostList>
    </HomeBox>
  )
}

type PostTopProps = {
  posts: PostWithRelation[]
  contents: Content[]
  categories: Category[]
  onCreate: (c: Content) => void
}
