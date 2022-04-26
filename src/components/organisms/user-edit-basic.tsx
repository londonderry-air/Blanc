import { FlexBox } from '../atoms/box/flex'
import { useRecoilState, useRecoilValue } from 'recoil'
import { editBlancUserState, themeColorState } from '~/states/atoms'
import { EditTextField } from '../molucules/edit-field-text'
import { EditUploadField } from '../molucules/edit-field-upload'

export const UserEditBasic = () => {
  const color = useRecoilValue(themeColorState)
  const [user, setUser] = useRecoilState(editBlancUserState)

  if (!user) return <></>

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
        title={'ユーザー名'}
        subTitle={'User Name'}
        description={`ユーザー名を設定します。`}
        defaultValue={user.name ?? ''}
        onInput={(s) => {
          setUser({ ...user, name: s })
        }}
      />
      <EditTextField
        title={'ユーザーID'}
        subTitle={'User ID'}
        description={`ユーザーIDを設定します。\nユーザーIDは他のユーザーと被らない値のみを設定することができます。`}
        defaultValue={user.blancId}
        onInput={(s) => {
          setUser({ ...user, blancId: s })
        }}
      />
      <EditUploadField
        title={'プロフィール画像'}
        subTitle={'Profile Image'}
        description={`プロフィール用画像を変更します。`}
        onChange={(file) => {
          setUser({ ...user, image: file, imageId: file.id })
        }}
        defaultValue={user.image}
      />
    </FlexBox>
  )
}
