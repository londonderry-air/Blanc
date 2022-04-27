import { Post, Content, Category, Item, BlancFile } from '$/node_modules/@prisma/client'
import { Cluster } from '../layout/cluster'
import { _LargeH, _Word } from '../atoms/text/_text'
import { FlexBox } from '../atoms/box/flex'
import { moduler } from '~/utils/styles'
import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { LabelText, LabelTextList } from '../atoms/text/label'
import { Box } from '../atoms/box/box'
import { StackText } from '../atoms/text/stack'
import { PublishCell } from '../atoms/cell/publish'
import { AnimateHoverBorderBox } from '../animation/animate-hover-border-box'
import { PublishStatus } from '$/types/status'
import { Link } from '../atoms/link/Link'
import { BorderBox } from '../atoms/box/border'
import { DateText } from '../atoms/text/date'
import { Image } from '../atoms/image/image'
import { PostWithRelation } from '$/types/post'
import { HoverFadeBox } from '../animation/aniamte-hover-fade-box'

export const PostListItem = (props: PostListItemProps) => {
  const post = props.post
  const color = useRecoilValue(themeColorState)
  return (
    <Link href={`/post/edit/${post.id}`} width={'100%'}>
      <Box width={'100%'}>
        <AnimateHoverBorderBox
          padding={`${moduler(0)} ${moduler(1)} ${moduler(0)} ${moduler(1)}`}
          unhoverWidth={'0em'}
          hoverWidth={'0.5em'}
          color={color.text}
        >
          <Cluster justifyContent="space-between" alignItem="center">
            <FlexBox way={'column'} gap={moduler(-3)}>
              <_LargeH weight={'700'} size={moduler(-1)} color={color.text}>
                {post.title}
              </_LargeH>
              <FlexBox way={'row'} gap={'1em'} alignItems={'center'}>
                <LabelTextList
                  list={[
                    {
                      label: 'コンテンツ',
                      value: props.content.name
                    },
                    {
                      label: 'カテゴリー',
                      value: props.category ? props.category.name : 'なし'
                    }
                  ]}
                  color={color.text}
                />
                {props.post.item && (
                  <FlexBox way={'row'} alignItems={'center'}>
                    <LabelText label={'アイテム'} value={''} />
                    <ItemInfo item={props.post.item} />
                  </FlexBox>
                )}
              </FlexBox>
            </FlexBox>
            <Box>
              <Cluster alignItem="center">
                <BorderBox
                  borderPosition={'left'}
                  padding={'0 0 0 1em'}
                  borderWidth={'1px'}
                  borderColor={color.lightBorder}
                  borderStyle={'solid'}
                >
                  <FlexBox way={'row'} alignItems={'center'} gap={'1em'}>
                    <StackText
                      top={'ステータス'}
                      bottom={'Status'}
                      color={color.text}
                      size={-2}
                    />
                    <PublishCell state={getPublishState(post)} />
                  </FlexBox>
                </BorderBox>
                <BorderBox
                  borderPosition={'left'}
                  padding={'0 0 0 1em'}
                  borderWidth={'1px'}
                  borderColor={color.lightBorder}
                  borderStyle={'solid'}
                >
                  <FlexBox
                    way={'column'}
                    border={{
                      width: '1px',
                      color: color.lightBorder,
                      style: 'solid'
                    }}
                  >
                    <FlexBox
                      way={'row'}
                      alignItems={'center'}
                      gap={'1em'}
                      padding={'0 0 8px 0'}
                    >
                      <StackText
                        top={'公開開始日'}
                        bottom={'From'}
                        color={color.text}
                        size={-3}
                      />
                      <DateText
                        date={new Date(props.post.from)}
                        weight={'700'}
                        size={moduler(-3)}
                        color={color.text}
                      />
                    </FlexBox>
                    <FlexBox
                      way={'row'}
                      alignItems={'center'}
                      gap={'1em'}
                      padding={'8px 0 0 0'}
                    >
                      <StackText
                        top={'公開終了日'}
                        bottom={'To'}
                        color={color.text}
                        size={-3}
                      />
                      <DateText
                        date={props.post.to ? new Date(props.post.to) : null}
                        defaultText={'期限なし'}
                        weight={'700'}
                        size={moduler(-3)}
                        color={color.text}
                      />
                    </FlexBox>
                  </FlexBox>
                </BorderBox>
              </Cluster>
            </Box>
          </Cluster>
        </AnimateHoverBorderBox>
      </Box>
    </Link>
  )
}

const ItemInfo = (props: { item: Item & { thumbnail: BlancFile | null; } }) => (
  <Link href={`/item/${props.item.id}`}>
    <HoverFadeBox
      amount={{
        fadein: '0.5',
        fadeout: '1'
      }}
    >
      <FlexBox way={'row'} gap={'6px'} alignItems={'center'}>
        <Image
          width={'30px'}
          height={'30px'}
          fit={'cover'}
          radius={'15px'}
          src={
            props.item.thumbnail
              ? props.item.thumbnail.url ?? './moon.png'
              : './moon.png'
          }
        />

        <_Word size={moduler(-3)} weight={'600'}>
          {props.item.name}
        </_Word>
      </FlexBox>
    </HoverFadeBox>
  </Link>
)

const getPublishState = (p: Post): PublishStatus => {
  const now = new Date()
  const from = new Date(p.from)
  const to = p.to ? new Date(p.to) : null
  if (to) {
    if (p.publish && from < now && to > now) {
      return 'publish'
    }
    if (p.publish && to < now) {
      return 'expired'
    }
  }
  if (p.publish && from < now) {
    return 'publish'
  }
  if (p.publish && from > now) {
    return 'comingsoon'
  }
  return 'draft'
}

type PostListItemProps = {
  post: PostWithRelation
  content: Content
  category: Category
}
