import { useCallback } from 'react'
import useAspidaSWR from '@aspida/swr'
import { apiClient } from '~/utils/apiClient'
import { ItemHome } from '~/components/templates/item-home'
import { Content } from '$/node_modules/@prisma/client'
import { useResetRecoilState } from 'recoil'
import { editItemState } from '~/states/atoms'
import { AnimateFadeVisibleBox } from '~/components/animation/animate-fade-visible-box'
import { Box } from '~/components/atoms/box/box'

const Page = () => {
  const { data: items, mutate } = useAspidaSWR(apiClient.v1.item)
  const { data: contents } = useAspidaSWR(apiClient.v1.content)
  const createItem = useCallback(async (content: Content) => {
    await apiClient.v1.item.post({ body: { contentId: content.id } })
    mutate()
  }, [])

  console.log(items)

  useResetRecoilState(editItemState)
  mutate()

  return (
    <Box width={'100%'}>
      <AnimateFadeVisibleBox
        isVisible={!!contents && !!items}
        translation={{ from: 'bottom', quantity: '10px', duration: '0.5s' }}
      >
        {items && contents && (
          <ItemHome
            items={items}
            contents={contents}
            onCreate={(c) => createItem(c)}
          />
        )}
      </AnimateFadeVisibleBox>
    </Box>
  )
}

export default Page
