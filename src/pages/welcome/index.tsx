import { useRouter } from 'next/router'
import { FlexBox } from '~/components/atoms/box/flex'
import { Image } from '~/components/atoms/image/image'
import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { _MainH, _Sentence } from '~/components/atoms/text/_text'
import { moduler } from '~/utils/styles'
import { Button } from '~/components/atoms/button/button'
import { signIn, useSession } from 'next-auth/react'
import { apiClient } from '~/utils/apiClient'
import { useEffect, useState } from 'react'

export const Page = () => {
  const router = useRouter()
  const color = useRecoilValue(themeColorState)
  const [image, setImage] = useState('')
  const { data: session, status: state } = useSession()

  useEffect(() => {
    if (session?.user.blancImage) {
      setImage(session?.user.blancImage)
    }
  }, [session])

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

  if (image === '') {
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
      <Image
        width={'100px'}
        height={'100px'}
        radius={'50px'}
        src={image}
        fit={'cover'}
        border={{
          width: '2px',
          color: color.border,
          style: 'solid'
        }}
      />
      <FlexBox way={'column'} alignItems={'center'} gap={'40px'}>
        <_MainH size={moduler(9)} weight={'600'}>
          🎉 Congratulations 🎉
        </_MainH>
        <_Sentence size={moduler(-2)} weight={'600'}>
          ユーザーの設定が完了しました。
        </_Sentence>
        <Button
          title="はじめる"
          subTitle="Let's Start!"
          padding="1em 80px"
          color={color.border}
          onClick={async () => {
            await apiClient.v1.admin.user.post({
              body: {
                email: session?.user.email,
                isFirstLogin: false
              }
            })
            router.push('/post')
          }}
        />
      </FlexBox>
    </FlexBox>
  )
}

export default Page
