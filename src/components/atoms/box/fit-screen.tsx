import { useRef, useState, useEffect } from 'react'
import useWindowSize from '~/hooks/useWindowSize'

export const FitScreenBox = (props: {
  children?: React.ReactNode
  borderTop?: {
    width?: string
    color?: string
    style?: string
    radius?: string
  }
  forceRefresh?: boolean
  forceRefreshDelay?: number
}) => {
  const elm = useRef(null)
  const winsize = useWindowSize()
  const [height, setHeight] = useState('auto')

  useEffect(() => {
    if (elm.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rect = (elm.current as any).getBoundingClientRect()
      setHeight(`${winsize.height - rect.top}px`)
    }
  }, [elm, winsize])

  useEffect(() => {
    if (elm.current) {
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rect = (elm.current as any).getBoundingClientRect()
        setHeight(`${winsize.height - rect.top}px`)
      }, props.forceRefreshDelay ?? 0)
    }
  }, [props.forceRefresh])
  return (
    <div
      style={{
        height,
        overflowY: 'scroll',
        borderTop: `${
          props.borderTop ? props.borderTop.style ?? 'solid' : 'solid'
        } ${props.borderTop ? props.borderTop.width ?? '1px' : '0px'} ${
          props.borderTop ? props.borderTop.color ?? '#000000' : '#000000'
        }`
      }}
      ref={elm}
    >
      {props.children}
    </div>
  )
}
