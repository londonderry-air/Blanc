import { useSession, signIn } from 'next-auth/react'
import { useRef } from 'react'
import { apiClient } from '~/utils/apiClient'
import { FlexBox } from '~/components/atoms/box/flex'
import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { _MainH, _Sentence } from '~/components/atoms/text/_text'
import { moduler } from '~/utils/styles'
import { Button } from '~/components/atoms/button/button'
import { Input } from '~/components/molucules/field-input'
import { ClickUpload } from '~/components/molucules/field-click-upload'
import { BlancFile } from '@prisma/client'
import { useRouter } from 'next/router'

export const Page = () => {
  const color = useRecoilValue(themeColorState)
  const router = useRouter()
  const { data: session, status: state } = useSession()
  const userName = useRef('')
  const userImage = useRef<BlancFile | null>(null)

  if (state === 'loading') {
    return <></>
  }

  if (state === 'unauthenticated') {
    signIn()
    return <></>
  }

  if (!session) {
    signIn()
    return <></>
  }

  if (!session.user.isFirstLogin) {
    router.replace('/post')
    return <></>
  }

  return (
    <FlexBox
      width={'100vw'}
      height={'100vh'}
      way={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      gap={'60px'}
    >
      <FlexBox way={'column'} alignItems={'center'} gap={'40px'}>
        <_MainH size={moduler(7)} weight={'600'}>
          Hello,Blanc!
        </_MainH>
        <_Sentence size={moduler(-2)} weight={'600'} align={'center'}>
          {'Blancへようこそ!\nはじめる前に、プロフィールを設定しましょう。'}
        </_Sentence>
        <ClickUpload
          width={'120px'}
          height={'120px'}
          radius={'60px'}
          defaultValue={null}
          onUpload={(f) => (userImage.current = f)}
        />
        <Input
          width={'50ch'}
          padding={'20px 14px'}
          placeholder={'ユーザー名'}
          defaultValue={session ? session.user.name : ''}
          onInput={(s) => (userName.current = s)}
        />
        <Button
          title="設定する"
          subTitle="SETTING PROFILE"
          padding="1em 80px"
          color={color.border}
          onClick={async () => {
            const { body: updateUser } = await apiClient.v1.admin.user.post({
              body: {
                email: session ? session.user.email ?? '' : '',
                name: userName.current,
                imageId: userImage.current ? userImage.current.id : null
              }
            })
            console.log(updateUser)
            if (updateUser) {
              router.push('/welcome')
            }
          }}
        />
      </FlexBox>
    </FlexBox>
  )
}

export default Page
