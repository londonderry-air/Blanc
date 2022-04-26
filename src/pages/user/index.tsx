import { HomeHeader } from '~/components/molucules/home-header'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { notifierState, themeColorState } from '~/states/atoms'
import { apiClient } from '~/utils/apiClient'
import useAspidaSWR from '@aspida/swr'
import { UserList } from '~/components/organisms/user-list'
import { UserCreateModal } from '~/components/organisms/modal-user-create'
import { useCallback, useState } from 'react'
import { UserFilter } from '~/components/organisms/user-filter'
import { HomeBox } from '~/components/molucules/home-box'

const Page = () => {
  const color = useRecoilValue(themeColorState)
  const setNotifier = useSetRecoilState(notifierState)
  const [isModalOpen, setModalOpen] = useState(false)
  const [isFilterOpen, setFilterOpen] = useState(false)
  const { data: users, mutate: mutate } = useAspidaSWR(
    apiClient.v1.admin.user.all
  )

  const onCreate = useCallback(
    async (user: { name: string; email: string }) => {
      await apiClient.v1.admin.user.put({
        body: {
          name: user.name,
          email: user.email,
          isOnline: false
        }
      })
      mutate()
      setModalOpen(false)
      setNotifier({
        state: 'success',
        message: {
          main: 'ユーザーを作成しました。',
          sub: `サインインページより、入力されたメールアドレス・パスワードを用いてログインをお試しください
          。ユーザーを新規登録する場合は、他のメールアドレスを使用して再度お試しください。`
        }
      })
    },
    []
  )

  if (!users) {
    return <></>
  }

  console.log(users)

  return (
    <>
      <HomeBox>
        <HomeHeader
          title="ユーザー"
          subTitle="USER"
          buttons={[
            {
              title: 'フィルター',
              subTitle: 'FILTER',
              color: isFilterOpen ? color.text : color.lightInactive,
              colors: {
                background: color.background,
                border: isFilterOpen ? color.text : color.fieldBackground,
                text: isFilterOpen ? color.text : color.fieldBackground
              },
              onClick: () => setFilterOpen(!isFilterOpen)
            },
            {
              title: '新規作成',
              subTitle: 'CREATE',
              color: color.text,
              onClick: () => setModalOpen(true)
            }
          ]}
        />
        {users && (
          <UserFilter
            users={users}
            isFilterOpen={isFilterOpen}
            onFiltered={(u) => console.log(u)}
          />
        )}
        {users && <UserList users={users} isFilterOpen={false} />}
      </HomeBox>
      <UserCreateModal
        isVisible={isModalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={(data) => onCreate(data)}
      />
    </>
  )
}

export default Page
