import { EditPost } from '$/types/post'
import { BlancComponent, BlancElement } from '$/types/_element'
import { useState } from 'react'
import styled from 'styled-components'
import { Sidebar } from '~/components/layout/sidebar'
import { randomStr } from '~/utils/variable'
import { PostEditDisplay } from '../organisms/post-edit-display'
import { PostEditSide } from '../organisms/post-edit-side'

export const PostEdit = (props: { post: EditPost; height: string }) => {
  const [render, forceRerender] = useState(false)
  const onAddElement = (component: BlancComponent) => {
    if (props.post.elements) {
      ;(props.post.elements as unknown as BlancElement[]).push({
        id: randomStr(),
        post: props.post,
        component: component,
        data: {}
      })
      forceRerender(!render)
      console.log(props.post.elements)
    }
  }

  return (
    <PostEditWrap height={props.height}>
      <Sidebar gap={'0em'} sideWidth={'34ch'} sidePosition={'right'}>
        <PostEditDisplay post={props.post} />
        <PostEditSide post={props.post} onAddElement={onAddElement} />
      </Sidebar>
    </PostEditWrap>
  )
}

const PostEditWrap = styled.div<{ height: string }>`
  height: ${(props) => props.height};

  > * {
    height: 100%;
    position: relative;

    > * {
      height: 100%;
      position: relative;
    }
  }
`
