import { EditPost } from '$/types/post'
import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { FlexBox } from '../atoms/box/flex'
import { Box } from '../layout/box'
import { SideTextField } from '../molucules/sidebar-field-text'
import { SideSwitchField } from '../molucules/sidebar-field-switch'
import { SideRadioField } from '../molucules/sidebar-field-radio'
import { SideTimeField } from '../molucules/sidebar-field-time'

export const PostEditSideSettings = (props: { post: EditPost }) => {
  const color = useRecoilValue(themeColorState)
  return (
    <Box padding={'0 1em 2em 1em'}>
      <FlexBox way={'column'} alignItems={'flex-start'}>
        <FlexBox
          way={'column'}
          gap={'2em'}
          border={{
            width: '1px',
            color: color.lightBorder,
            style: 'solid'
          }}
        >
          <SideTextField
            title={'スラッグ'}
            subTitle={'SLUG'}
            description={`投稿のスラッグを設定します。\n設定したスラッグはこの投稿のURLの末尾に反映されます。`}
            defaultValue={props.post.slug}
            onInput={(s) => (props.post.slug = s)}
          />
          <SideTimeField
            title={'公開開始日'}
            subTitle={'RELEASE DATE'}
            description={`この投稿の公開開始日を設定します。\n投稿にアイテムが紐づいている場合は、そのアイテムも公開に設定されている場合に限り公開されます。`}
            defaultValue={new Date(props.post.from)}
            onSelect={(s) => {
              if (s) {
                props.post.from = s
              }
            }}
          />
          <SideTimeField
            title={'公開終了日'}
            subTitle={'CLOSE DATE'}
            description={`この投稿の公開終了日を設定します。\n投稿にアイテムが紐づいている場合は、そのアイテムも同時に非公開となります。`}
            defaultValue={props.post.to ? new Date(props.post.to) : null}
            onSelect={(s) => {
              if (s) {
                props.post.to = s
              }
            }}
          />
          <SideSwitchField
            title={'公開設定'}
            subTitle={'PUBLISH'}
            description={`Webサイト上における投稿の公開・非公開を設定します。\n公開設定が「有効」になっており、リリース日を過ぎている投稿のみWebサイト上に公開されます。`}
            state={props.post.publish}
            onSwitch={(s) => (props.post.publish = s)}
          />
          <SideRadioField
            title={'カテゴリー'}
            subTitle={'CATEGORY'}
            description={`この投稿のカテゴリーを設定します。`}
            values={
              props.post.content
                ? props.post.content.categories.map((c) => c.name)
                : []
            }
            selectedValue={props.post.category ? props.post.category.name : ''}
            onChange={(s) => {
              const category = props.post.content?.categories.filter(
                (c) => c.name === s
              )[0]
              console.log(category)
              if (category) props.post.categoryId = category.id
            }}
          />
        </FlexBox>
      </FlexBox>
    </Box>
  )
}
