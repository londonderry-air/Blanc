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

const Wrap = styled.div<{
  width: string,
  height: string
}>`
  width: ${props => props.width};
  height: ${props => props.height};
  border-bottom: solid 1px ${color.gray};
`

const DEFAULT_WIDTH = '100%';
const DEFAULT_HEIGHT = '86px';

export const PostEditHeader = (props: {
  post: Post
  size?: {
    width?: string,
    height?: string
  }
  onSave: () => void
  onDelete: () => void
}) => {
  const router = useRouter()
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

  return (
    <Wrap 
      width={props.size ? props.size.width ?? DEFAULT_WIDTH : DEFAULT_WIDTH} 
      height={props.size ? props.size.height ?? DEFAULT_HEIGHT : DEFAULT_HEIGHT}
    >
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
