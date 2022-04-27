import { Post } from '@prisma/client'
import { FlexBox } from '../atoms/box/flex'
import { Box } from '../layout/box'
import { BlancComponent, blancComponents } from '$/types/$element'
import { PostEditComponentListItem } from './post-edit-component-list-item'

export const PostEditSideComponent = (props: {
  post: Post
  onAddElement: (component: BlancComponent) => void
}) => {
  return (
    <Box padding={'1em'}>
      <FlexBox way={'column'} alignItems={'flex-start'}>
        <FlexBox width={'100%'} way={'column'} gap={'1em'}>
          {blancComponents.map((cmp) => (
            <PostEditComponentListItem
              key={cmp}
              component={cmp}
              onClick={() => props.onAddElement(cmp)}
            />
          ))}
        </FlexBox>
      </FlexBox>
    </Box>
  )
}
