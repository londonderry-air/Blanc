import { Cluster } from '~/components/layout/cluster'
import { moduler } from '~/utils/styles'
import styled from 'styled-components'
import { Box } from '~/components/layout/box'
import { color } from '~/utils/variable'
import { ButtonProps } from '$/types/element'
import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { Post } from '@prisma/client'
import { Button } from '../atoms/button/button'
import { useRouter } from 'next/router'
import { Input } from '../molucules/field-input'
import { MutableRefObject, useEffect, useRef } from 'react'

const Wrap = styled.div`
  width: 100%;
  border-bottom: solid 1px ${color.gray};
`

export const PostEditHeader = (props: PostHeaderProps) => {
  const router = useRouter()
  const ref = useRef() as MutableRefObject<HTMLDivElement>
  const color = useRecoilValue(themeColorState)
  const backButton: ButtonProps = {
    title: '戻る',
    subTitle: 'BACK',
    color: color.text,
    colors: {
      border: 'transparent',
      background: 'transparent',
      text: color.text
    },
    onClick: () => router.push('/post')
  }
  const actionButtons: ButtonProps[] = [
    {
      title: '削除',
      subTitle: 'DELETE',
      color: color.caution,
      onClick: () => props.onDelete()
    },
    {
      title: '保存',
      subTitle: 'SAVE',
      color: color.active,
      onClick: () => props.onSave()
    }
  ]

  useEffect(() => {
    if (ref.current) {
      props.onRender(ref.current)
    }
  }, [ref])

  return (
    <Wrap ref={ref}>
      <Box padding={`${moduler(-1)} ${moduler(3)}`}>
        <Cluster alignItem="center" gap={'2em'}>
          <Button
            title={backButton.title}
            subTitle={backButton.subTitle}
            color={backButton.color}
            onClick={backButton.onClick}
          />
          <Box grow={'9999'}>
            <Input
              width="100%"
              background="transparent"
              placeholder="投稿のタイトルを入力してください"
              padding="0"
              font={{
                size: moduler(-1),
                weight: '600'
              }}
              defaultValue={props.post.title}
              onInput={(s) => {
                props.post.title = s
                console.log(props.post)
              }}
            />
          </Box>
          <Cluster alignItem="center" gap={moduler(-1)}>
            {actionButtons.map((btn, i) => (
              <Button
                key={i}
                title={btn.title}
                subTitle={btn.subTitle}
                color={btn.color}
                onClick={btn.onClick}
              />
            ))}
          </Cluster>
        </Cluster>
      </Box>
    </Wrap>
  )
}

type PostHeaderProps = {
  post: Post
  onSave: () => void
  onDelete: () => void
  onRender: (ref: HTMLDivElement) => void
}
