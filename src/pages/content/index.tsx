import useAspidaSWR from '@aspida/swr'
import { apiClient } from '~/utils/apiClient'
import { useCallback } from 'react'
import { randomStr } from '~/utils/variable'
import { ContentHome } from '~/components/templates/content-home'
import { AnimateFadeVisibleBox } from '~/components/animation/animate-fade-visible-box'
import { Box } from '~/components/atoms/box/box'

const Page = () => {
  const { data: contents, mutate } = useAspidaSWR(apiClient.v1.content)
  console.log(contents)

  const createContent = useCallback(async () => {
    await apiClient.v1.content.post({ body: { name: randomStr() } })
    mutate()
  }, [])

  return (
    <Box width={'100%'}>
      <AnimateFadeVisibleBox
        isVisible={contents !== undefined}
        translation={{ from: 'bottom', quantity: '10px', duration: '0.5s' }}
      >
        {contents && (
          <ContentHome contents={contents} onCreate={createContent} />
        )}
      </AnimateFadeVisibleBox>
    </Box>
  )
}

export default Page
