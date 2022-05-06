import { EditPost } from '$/types/post'
import {
  AnimateSwitchOverBox,
  AnimateSwitchOverBoxItem
} from '../animation/animate-switch-over-box'
import { FlexBox } from '../atoms/box/flex'
import { PostEditSideNav, PostEditSideNavType } from './post-edit-side-nav'
import { PostEditSideSettings } from './post-edit-side-settings'
import { PostEditSideSeo } from './post-edit-side-seo'
import { useState } from 'react'
import { PostEditSideComponent } from './post-edit-side-component'
import { BlancComponent } from '$/types/_element'

export const PostEditSide = (props: {
  post: EditPost
  onAddElement: (component: BlancComponent) => void
}) => {
  const [nav, setNav] = useState<PostEditSideNavType>('settings')
  return (
    <FlexBox way={'column'} height={'100%'}>
      <AnimateSwitchOverBox
        childKey={nav}
        width={'100%'}
        fade={{ quantity: '10px', duration: 0.3 }}
      >
        <AnimateSwitchOverBoxItem childKey={'settings' as PostEditSideNavType}>
          <PostEditSideSettings post={props.post} />
        </AnimateSwitchOverBoxItem>
        <AnimateSwitchOverBoxItem childKey={'seo' as PostEditSideNavType}>
          <PostEditSideSeo post={props.post} />
        </AnimateSwitchOverBoxItem>
        <AnimateSwitchOverBoxItem childKey={'component' as PostEditSideNavType}>
          <PostEditSideComponent
            post={props.post}
            onAddElement={props.onAddElement}
          />
        </AnimateSwitchOverBoxItem>
      </AnimateSwitchOverBox>
      <PostEditSideNav state={nav} onNavigate={(n) => setNav(n)} />
    </FlexBox>
  )
}
