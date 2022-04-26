import { ItemParamType } from '$/types/item'
import { useState } from 'react'
import { Box } from '../atoms/box/box'
import { Stack } from '../layout/stack'
import { ItemParamSelectItem } from './item-param-select-item'

export const ItemParamSelect = (props: {
  onClick: (type: ItemParamType) => void
}) => {
  const types: ItemParamType[] = [
    'text',
    'area',
    'number',
    'date',
    'switch',
    'image',
    'json'
  ]
  const [selected, setSelected] = useState<ItemParamType>()
  return (
    <Box width={'60vw'}>
      <Stack margin={'0'}>
        {types.map((type) => (
          <ItemParamSelectItem
            key={type}
            type={type}
            onClick={() => {
              props.onClick(type)
              setSelected(type)
            }}
            isSelected={selected === type}
          ></ItemParamSelectItem>
        ))}
      </Stack>
    </Box>
  )
}
