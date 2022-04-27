import { Content } from '@prisma/client'
import { useState } from 'react'
import { Box } from '../atoms/box/box'
import { Stack } from '../layout/stack'
import { ModalContentSelectItem } from './modal-content-select-item'

export const ModalContentSelect = (props: {
  contents: Content[]
  onSelect: (content: Content) => void
}) => {
  const [selected, setSelected] = useState<Content>()
  return (
    <Box width={'60vw'}>
      <Stack margin={'0'}>
        {props.contents.map((content) => (
          <ModalContentSelectItem
            key={content.id}
            onSelect={(c) => {
              props.onSelect(c)
              setSelected(c)
            }}
            isSelected={selected === content}
            content={content}
          />
        ))}
      </Stack>
    </Box>
  )
}
