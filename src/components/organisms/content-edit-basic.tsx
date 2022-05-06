import { FlexBox } from '../atoms/box/flex'
import { useRecoilState, useRecoilValue } from 'recoil'
import { editContentState, themeColorState } from '~/states/atoms'
import { EditTextField } from '../molucules/edit-field-text'
import { EditSwitchField } from '../molucules/edit-field-switch'

export const ContentEditBasic = () => {
  const color = useRecoilValue(themeColorState)
  const [content, setContent] = useRecoilState(editContentState)

  if (!content) return <></>

  return (
    <FlexBox
      way={'column'}
      gap={'36px'}
      border={{
        color: color.lightBorder,
        width: '1px',
        style: 'solid'
      }}
    >
      <EditTextField
        title={'コンテンツ名'}
        subTitle={'Content Name'}
        description={`このコンテンツの名前を設定します。`}
        defaultValue={content.name}
        validators={[{
          title: {local: '半角英数字のみ入力可能', global: 'Accept Only ENGLISH and NUMBER'},
          regex: new RegExp(/^[0-9a-zA-Z]*$/, 'g')
        }]}
        onInput={(s) => setContent({ ...content, name: s })}
      />
      <EditTextField
        title={'スラッグ'}
        subTitle={'Slug'}
        description={`このコンテンツのスラッグを設定します。\n設定したスラッグは、このコンテンツに属する投稿のURLに反映されます。`}
        defaultValue={content.slug}
        onInput={(s) => setContent({ ...content, slug: s })}
      />
      <EditSwitchField
        title={'投稿の自動作成（アイテム生成時）'}
        subTitle={'Automatic Post Creation'}
        description={`アイテム作成時に、作成したアイテムに紐づく投稿を自動的に作成します。\nアイテムに伴う紹介ページなどを作成する場合は有効に設定し、自動作成された投稿を編集することを推奨しています。`}
        state={content.isAutoPostCreateWithItem}
        onSwitch={(s) =>
          setContent({ ...content, isAutoPostCreateWithItem: s })
        }
      />
    </FlexBox>
  )
}
