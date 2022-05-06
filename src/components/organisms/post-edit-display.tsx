import { Post } from '@prisma/client'
import { useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { BorderBox } from '../atoms/box/border'
import { Box } from '../atoms/box/box'
import { PostEditElements } from './post-edit-elements'

export const PostEditDisplay = (props: { post: Post }) => {
  const color = useRecoilValue(themeColorState)
  const editor = useRef() as React.MutableRefObject<HTMLDivElement>;
  const $scrollTop = useRef(0)

  if (editor.current) {
    editor.current.scrollTo({
      top: $scrollTop.current,
      behavior: 'auto'
    })
  }
  
  return (
    <Box height={'100%'} padding={`2em 4em`} background={color.fieldBackground}>
      <BorderBox
        height={'100%'}
        radius={'16px'}
        overflow={{ x: 'hidden' }}
        borderPosition={'all'}
        borderWidth={'1px'}
        borderStyle={'solid'}
        borderColor={color.lightBorder}
        background={color.background}
        position={'relative'}
        ref={editor}
        onScroll={(e) => $scrollTop.current = e.currentTarget.scrollTop}
      >
        <PostEditElements post={props.post} />
      </BorderBox>
    </Box>
  )
}
