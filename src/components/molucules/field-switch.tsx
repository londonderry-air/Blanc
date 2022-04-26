import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { Button } from '../atoms/button/button'

export const Switch = (props: {
  state: boolean
  onSwitch: (state: boolean) => void
}) => {
  const color = useRecoilValue(themeColorState)
  const [state, setState] = useState(props.state)
  return (
    <Button
      width={'20ch'}
      title={state ? '有効' : '無効'}
      subTitle={state ? 'ACTIVE' : 'INACTIVE'}
      color={state ? color.active : color.inactive}
      onClick={() => {
        const newState = !state
        setState(newState)
        props.onSwitch(newState)
      }}
    ></Button>
  )
}
