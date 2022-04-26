import { moduler } from '~/utils/styles'
import { Box } from '../layout/box'
import { Stack } from '../layout/stack'

export const EditBox = (props: {
  isVisible: boolean
  children?: React.ReactNode
}) => (
  <Box padding={`${moduler(0)} ${moduler(12)} 0 ${moduler(12)}`}>
    <Stack margin={moduler(6)}>{props.children}</Stack>
  </Box>
)
