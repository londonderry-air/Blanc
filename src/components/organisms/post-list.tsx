import { Content, Category } from '@prisma/client'
import { FlexBox } from '../atoms/box/flex'
import { FitScreenBox } from '../atoms/box/fit-screen'
import { PostListItem } from './post-list-item'
import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { PostWithRelation } from '$/types/post'

export const PostList = (props: PostListProps) => {
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
        padding={'0 0 10vh 0'}
        border={{
          color: color.lightBorder,
          width: '1px',
          style: 'solid'
        }}
      >
        {props.posts.map((post) => (
          <PostListItem
            key={post.id}
            post={post}
            content={props.contents.filter((c) => c.id === post.contentId)[0]}
            category={
              props.categories.filter((c) => c.id === post.categoryId)[0]
            }
          />
        ))}
      </FlexBox>
    </FitScreenBox>
  )
}

type PostListProps = {
  posts: PostWithRelation[]
  contents: Content[]
  categories: Category[]
  isFilterOpen: boolean
}
