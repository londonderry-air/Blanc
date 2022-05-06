import { _LargeH } from '../atoms/text/_text'
import { LabelTextList } from '../atoms/text/label'
import { moduler } from '~/utils/styles'
import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { HoverBorderBox } from '../atoms/box/border'
import { Link } from '../atoms/link/Link'
import { Box } from '../atoms/box/box'
import { FlexBox } from '../atoms/box/flex'
import { ContentWithRelation } from '$/types/content'

export const ContentListItem = (props: { content: ContentWithRelation }) => {
  const content = props.content
  const color = useRecoilValue(themeColorState)
  return (
    <Link href={`/content/${content.id}`} width={'100%'}>
      <Box width={'100%'}>
        <HoverBorderBox
          padding={`${moduler(3)} ${moduler(1)} ${moduler(3)} ${moduler(1)}`}
          unhover={{width: '0em'}}
          hover={{width: '0.5em'}}
          color={color.text}
        >
          <FlexBox way={'column'} gap={moduler(-3)}>
            <_LargeH weight={'700'} size={moduler(-1)} color={color.text}>
              {content.name}
            </_LargeH>
            <LabelTextList
              list={[
                {
                  label: '投稿数',
                  value: content.posts.length.toString()
                },
                {
                  label: 'アイテム数',
                  value: content.items.length.toString()
                },
                {
                  label: 'カテゴリー数',
                  value: content.categories.length.toString()
                }
              ]}
              color={color.text}
            />
          </FlexBox>
        </HoverBorderBox>
      </Box>
    </Link>
  )
}
