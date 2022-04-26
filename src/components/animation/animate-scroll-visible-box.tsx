import { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'

const AnimateWrap = styled.div<{ isVisible: boolean; height: string }>`
  height: ${(props) => (props.isVisible ? props.height : '0px')};
  overflow: hidden;
  ${(props) => (props.isVisible ? '' : 'margin-top: 0px !important;')}
`

export const AnimateScrollVisibleBox = (props: {
  children: React.ReactNode
  isVisible: boolean
}) => {
  const elm = useRef(null)
  const [height, setHeight] = useState('auto')

  useEffect(() => {
    if (elm.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rect = (elm.current as any).getBoundingClientRect()
      setHeight(`${rect.height}px`)
    }
  }, [elm])

  return (
    <AnimateWrap isVisible={props.isVisible} height={height}>
      <div ref={elm}>{props.children}</div>
    </AnimateWrap>
  )
}
