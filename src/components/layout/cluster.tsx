import styled from 'styled-components'

const Wrap = styled.div<{
  gap: string
  alignItem: string
  justifyContent: string
}>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-grow: 99;
  gap: ${(props) => props.gap};
  align-items: ${(props) => props.alignItem};
  justify-content: ${(props) => props.justifyContent};
`

export const Cluster = (props: ClusterProps) => {
  const children = props.children
  const gap = props.gap ?? '1em'
  const alignItem = props.alignItem ?? 'center'
  const justifyContent = props.justifyContent ?? 'flex-start'

  return (
    <Wrap gap={gap} alignItem={alignItem} justifyContent={justifyContent}>
      {children}
    </Wrap>
  )
}

type ClusterProps = {
  children: React.ReactNode
  gap?: string
  alignItem?: string
  justifyContent?: string
}
