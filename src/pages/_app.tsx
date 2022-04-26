import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { AppHeader } from '~/components/organisms/app-header'
import { useRouter } from 'next/router'
import { Notifier } from '~/components/molucules/notifier'
import { Modal } from '~/components/molucules/modal'
import { SessionProvider } from 'next-auth/react'
import { FlexBox } from '~/components/atoms/box/flex'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter()

  return typeof window === 'undefined' ? (
    <></>
  ) : (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Notifier />
        <Modal />
        <FlexBox way={'column'}>
          <AppHeader displayPath={router.pathname}></AppHeader>
          <Component {...pageProps} />
        </FlexBox>
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp
