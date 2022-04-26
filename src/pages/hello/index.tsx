import { useRouter } from 'next/router'
import { useEffect, useCallback, useState } from 'react'
import { apiClient } from '~/utils/apiClient'
import { FlexBox } from '~/components/atoms/box/flex'
import { Image } from '~/components/atoms/image/image'
import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { _MainH, _Sentence } from '~/components/atoms/text/_text'
import { moduler } from '~/utils/styles'
import { Button } from '~/components/atoms/button/button'
import { signIn } from 'next-auth/react'

export const Page = () => {
  const router = useRouter()
  const [userCount, setUserCount] = useState(0)
  const color = useRecoilValue(themeColorState)

  const getUserCount = useCallback(async () => {
    const res = await apiClient.v1.admin.user.count.get()
    setUserCount(res.body)
  }, [])

  useEffect(() => {
    getUserCount()
  }, [])

  useEffect(() => {
    if (userCount !== 0) {
      router.push('/signin')
    }
  }, [userCount])

  if (userCount > 0) {
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
        src={'./blanc.png'}
        fit={'cover'}
        border={{
          width: '2px',
          color: color.border,
          style: 'solid'
        }}
      />
      <FlexBox way={'column'} alignItems={'center'} gap={'40px'}>
        <_MainH size={moduler(9)} weight={'600'}>
          Hello,Blanc!
        </_MainH>
        <_Sentence size={moduler(-2)} weight={'600'}>
          まずは、最初のユーザーを作成します。
        </_Sentence>
        <Button
          title="最初のユーザーを作成する"
          subTitle="CREATE FIRST USER"
          padding="1em 80px"
          color={color.border}
          onClick={() => signIn()}
        />
      </FlexBox>
    </FlexBox>
  )
}

export default Page
