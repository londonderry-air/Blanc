import { Item, Content, BlancFile } from '@prisma/client'
import { Cluster } from '../layout/cluster'
import { _LargeH } from '../atoms/text/_text'
import { moduler } from '~/utils/styles'
import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { LabelTextList } from '../atoms/text/label'
import { StackText } from '../atoms/text/stack'
import { PublishCell } from '../atoms/cell/publish'
import { FlexBox } from '../atoms/box/flex'
import { PublishStatus } from '$/types/status'
import { AnimateHoverBorderBox } from '../animation/animate-hover-border-box'
import { Image } from '../atoms/image/image'
import { Link } from '../atoms/link/Link'
import { BorderBox } from '../atoms/box/border'
import { Box } from '../atoms/box/box'

export const ItemListItem = (props: {
  item: Item & {
    thumbnail: BlancFile | null
  }
  content: Content
}) => {
  const color = useRecoilValue(themeColorState)
  return (
    <Link href={`/item/${props.item.id}`} width={'100%'}>
      <Box width={'100%'}>
        <AnimateHoverBorderBox
          padding={`${moduler(-1)} ${moduler(1)} ${moduler(-1)} ${moduler(1)}`}
          unhoverWidth={'0em'}
          hoverWidth={'0.5em'}
          color={color.text}
        >
          <Cluster
            justifyContent="flex-start"
            alignItem="center"
            gap={moduler(4)}
          >
            <Image
              width={'60px'}
              height={'60px'}
              src={
                props.item.thumbnail
                  ? props.item.thumbnail.url ?? '/moon.png'
                  : '/moon.png'
              }
              radius={'30px'}
              border={{
                width: '2px',
                style: 'solid',
                color: color.border
              }}
              fit={'cover'}
            />
            <Cluster justifyContent="space-between" alignItem="center">
              <FlexBox way={'column'} gap={moduler(-3)}>
                <_LargeH weight={'700'} size={moduler(-1)} color={color.text}>
                  {props.item.name}
                </_LargeH>
                <LabelTextList
                  list={[
                    {
                      label: 'コンテンツ',
                      value: props.content
                        ? props.content.name.toUpperCase()
                        : ''
                    }
                  ]}
                  color={color.text}
                />
              </FlexBox>
              <Box>
                <Cluster alignItem="center">
                  <BorderBox
                    borderPosition={'left'}
                    borderWidth={'1px'}
                    borderColor={color.lightBorder}
                    borderStyle={'solid'}
                    padding={'0 0 0 1em'}
                  >
                    <FlexBox way={'row'} gap={'1em'} alignItems={'center'}>
                      <StackText
                        top={'ステータス'}
                        bottom={'Status'}
                        color={color.text}
                        size={-2}
                      />
                      <PublishCell state={getPublishState(props.item)} />
                    </FlexBox>
                  </BorderBox>
                </Cluster>
              </Box>
            </Cluster>
          </Cluster>
        </AnimateHoverBorderBox>
      </Box>
    </Link>
  )
}

const getPublishState = (item: Item): PublishStatus => {
  const now = new Date()
  const from = new Date(item.from)
  const to = item.to ? new Date(item.to) : null
  if (to === null) {
    if (item.public && from < now) {
      return 'publish'
    }
    if (item.public && from > now) {
      return 'comingsoon'
    }
    if (!item.public) {
      return 'draft'
    }
  }
  if (to !== null) {
    if (item.public && from < now && to > now) {
      return 'publish'
    }
    if (item.public && to < now) {
      return 'expired'
    }
    if (item.public && from > now) {
      return 'comingsoon'
    }
    if (!item.public) {
      return 'draft'
    }
  }

  return 'draft'
}
