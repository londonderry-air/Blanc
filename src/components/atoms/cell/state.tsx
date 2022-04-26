import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { Cell } from './cell'

export const StateCell = (props: {
  state: boolean
  title: { active: string; inactive: string }
  subTitle: { active: string; inactive: string }
  width?: string
}) => {
  const color = useRecoilValue(themeColorState)
  return (
    <Cell
      width={props.width}
      title={props.state ? props.title.active : props.title.inactive}
      subTitle={props.state ? color.active : color.inactive}
      colors={
        props.state
          ? {
              background: color.active,
              border: color.active,
              text: color.cellText
            }
          : {
              background: color.inactive,
              border: color.inactive,
              text: color.cellText
            }
      }
    />
  )
}
