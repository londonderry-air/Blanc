import { FlexBox } from '~/components/atoms/box/flex'
import { Image } from '~/components/atoms/image/image'
import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { _MainH, _Sentence } from '~/components/atoms/text/_text'
import { moduler } from '~/utils/styles'
import { Button } from '~/components/atoms/button/button'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export const Page = () => {
  const session = useSession()
  const router = useRouter()
  const color = useRecoilValue(themeColorState)

  if (session.status === 'loading') {
    return <></>
  }

  if (session.status === 'unauthenticated') {
    router.push('/hello')
    return <></>
  }

  if (!session.data) {
    router.push('/hello')
    return <></>
  }

  const user = session.data.user

  console.log(user)

  if (session.status === 'authenticated' && user.isBlancUser) {
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
      <Image
        width={'100px'}
        height={'100px'}
        radius={'50px'}
        src={'/blanc.png'}
        fit={'cover'}
        border={{
          width: '2px',
          color: color.border,
          style: 'solid'
        }}
      />
      <FlexBox way={'column'} alignItems={'center'} gap={'40px'}>
        <_MainH size={moduler(9)} weight={'600'}>
          Oops!
        </_MainH>
        <_Sentence size={moduler(-2)} weight={'600'} align={'center'}>
          {`ログインしたGoogleアカウントはBlancに登録されていないようです。\nメールアドレスを再度ご確認いただくか、管理者によるメールアドレスの登録実施後に再度お試しください。`}
        </_Sentence>
        <Button
          title="ログイン画面へ戻る"
          subTitle="Back to Signin Page"
          padding="1em 80px"
          color={color.border}
          onClick={() => signOut()}
        />
      </FlexBox>
    </FlexBox>
  )
}

export default Page
