import { useSession, signIn, signOut } from 'next-auth/react'

export const Page = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user ? session.user.name : 'ANONIMUS'} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}

export default Page
