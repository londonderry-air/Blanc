import {
  Content,
  Category,
  BlancFile,
  BlancUser
} from '$/node_modules/@prisma/client'
import { FlexBox } from '../atoms/box/flex'
import { FitScreenBox } from '../atoms/box/fit-screen'
import { PostListItem } from './post-list-item'
import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { PostWithRelation } from '$/types/post'
import { UserListItem } from './user-list-item'

export const UserList = (props: {
  users: (BlancUser & {
    image: BlancFile | null
  })[]
  isFilterOpen: boolean
}) => {
  const color = useRecoilValue(themeColorState)
  return (
    <FitScreenBox
      borderTop={{
        color: color.lightBorder,
        width: '1px',
        style: 'solid'
      }}
      forceRefresh={props.isFilterOpen}
      forceRefreshDelay={200}
    >
      <FlexBox
        way={'column'}
        padding={'0 0 10vh 0'}
        border={{
          color: color.lightBorder,
          width: '1px',
          style: 'solid'
        }}
      >
        {props.users.map((user) => (
          <UserListItem key={user.id} user={user} />
        ))}
      </FlexBox>
    </FitScreenBox>
  )
}
