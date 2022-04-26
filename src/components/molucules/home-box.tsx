import { moduler } from '~/utils/styles'
import { Box } from '../layout/box'
import { Stack } from '../layout/stack'

export const HomeBox = (props: { children?: React.ReactNode }) => (
  <Box width={'100%'} padding={`${moduler(0)} ${moduler(12)} 0 ${moduler(12)}`}>
    <Stack margin={moduler(3)}>{props.children}</Stack>
  </Box>
)
