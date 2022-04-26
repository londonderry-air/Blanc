import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { FieldTitle } from './field-title'
import { FieldDesc } from './field-description'
import { Stack } from '../layout/stack'
import { moduler } from '~/utils/styles'
import { Box } from '../layout/box'
import { Upload } from './field-upload'
import { BlancFile } from '$/node_modules/.prisma/client'

export const EditUploadField = (props: {
  title: string
  subTitle?: string
  description?: string
  defaultValue: BlancFile | null
  onChange: (file: BlancFile) => void
}) => {
  const color = useRecoilValue(themeColorState)
  return (
    <Box width={'60ch'}>
      <Stack margin={moduler(2)}>
        <FieldTitle
          title={props.title}
          subTitle={props.subTitle}
          text={{ color: color.text }}
          border={{
            color: color.border,
            width: '4px'
          }}
        />
        {props.description && (
          <FieldDesc color={color.grayText} description={props.description} />
        )}
        <Upload
          defaultValue={props.defaultValue}
          onUpload={(file) => {
            props.onChange(file)
          }}
        />
      </Stack>
    </Box>
  )
}
