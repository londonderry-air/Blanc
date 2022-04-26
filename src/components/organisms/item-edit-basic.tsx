import { FlexBox } from '../atoms/box/flex'
import { useRecoilState, useRecoilValue } from 'recoil'
import { editItemState, themeColorState } from '~/states/atoms'
import { EditTextField } from '../molucules/edit-field-text'
import { EditUploadField } from '../molucules/edit-field-upload'
import { EditDateField } from '../molucules/edit-field-date'
import { EditSwitchField } from '../molucules/edit-field-switch'

export const ItemEditBasic = () => {
  const color = useRecoilValue(themeColorState)
  const [item, setItem] = useRecoilState(editItemState)

  if (!item) return <></>

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
        title={'アイテム名'}
        subTitle={'Item Name'}
        description={`このアイテムの名前を設定します。`}
        defaultValue={item.name}
        onInput={(s) => {
          console.log('before: ' + item.name)
          console.log('after: ' + item.name)
          setItem({ ...item, name: s })
        }}
      />
      <EditSwitchField
        title={'公開設定'}
        subTitle={'PUBLIC'}
        description={`このアイテムの公開設定を変更します。\n\n以下の条件を満たす場合、投稿内容もしくはWebサイトにこのアイテムの内容が反映されるようになります。\n・公開設定が「公開」に設定されている\n・公開日を過ぎている\n・公開終了日が設定されていない もしくは 公開終了日を過ぎていない`}
        state={item.public}
        onSwitch={(e) => setItem({ ...item, public: e })}
      />
      <EditDateField
        title={'公開日'}
        subTitle={'PUBLISH DATE'}
        description={`このアイテムのリリース時間を設定します。\n\n以下の条件を満たす場合、投稿内容もしくはWebサイトにこのアイテムの内容が反映されるようになります。\n・公開設定が「公開」に設定されている\n・公開日を過ぎている\n・公開終了日が設定されていない もしくは 公開終了日を過ぎていない`}
        defaultValue={new Date(item.from)}
        onSelect={(d) => {
          if (d) setItem({ ...item, from: d })
        }}
      />
      <EditDateField
        title={'公開終了日'}
        subTitle={'RELEASE END DATE'}
        description={`このアイテムのリリース終了時間を設定します。\n\n以下の条件を満たす場合、投稿内容もしくはWebサイトにこのアイテムの内容が反映されるようになります。\n・公開設定が「公開」に設定されている\n・公開日を過ぎている\n・公開終了日が設定されていない もしくは 公開終了日を過ぎていない`}
        defaultValue={item.to ? new Date(item.to) : null}
        isEnableEmpty={true}
        onSelect={(d) => setItem({ ...item, to: d })}
      />
      <EditUploadField
        title={'アイテム名'}
        subTitle={'Item Name'}
        description={`このアイテムの名前を設定します。`}
        onChange={(file) => {
          setItem({ ...item, thumbnail: file, thumbnailId: file.id })
        }}
        defaultValue={item.thumbnail}
      />
    </FlexBox>
  )
}
