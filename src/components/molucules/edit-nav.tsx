import { Stack } from '../layout/stack'
import { EditNavItem } from './edit-nav-item'

export const EditNav = (props: {
  navs: {
    title: string
    subTitle?: string
    isDisplay: boolean
    href: string
    onSelect?: (navKey: string) => void
  }[]
}) => {
  return (
    <Stack margin={'0.5em'}>
      {props.navs.map((nav, i) => (
        <EditNavItem
          key={i}
          title={nav.title}
          subTitle={nav.subTitle}
          href={nav.href}
          isDisplay={nav.isDisplay}
        />
      ))}
    </Stack>
  )
}
