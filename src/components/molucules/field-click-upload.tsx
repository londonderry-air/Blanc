import { BlancFile } from '@prisma/client'
import { useState } from 'react'
import styled from 'styled-components'
import { apiClient } from '~/utils/apiClient'
import { createBlancFile } from '~/utils/file'
import { randomStr } from '~/utils/variable'
import { Image } from '../atoms/image/image'

const HiddenInput = styled.input`
  display: none;
`

const Wrap = styled.label<{
  width?: string
  height?: string
  radius?: string
}>`
  ${(props) => (props.width ? `width: ${props.width};` : '')}
  ${(props) => (props.height ? `height: ${props.height};` : '')}
${(props) => (props.radius ? `border-radius: ${props.radius};` : '')}
cursor: pointer;
  border: solid 3px #313131;
`

export const ClickUpload = (props: {
  width: string
  height: string
  radius: string
  defaultValue: BlancFile | null
  onUpload: (file: BlancFile) => void
}) => {
  const name = randomStr()
  const [file, setFile] = useState<BlancFile | null>(props.defaultValue ?? null)
  return (
    <Wrap
      htmlFor={name}
      width={props.width}
      height={props.height}
      radius={props.radius}
    >
      <HiddenInput
        id={name}
        type={'file'}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          console.log(e.target.files)
          const files = e.target.files
          const file = files ? files[0] : null
          if (!file) {
            return
          }
          createBlancFile(file, async (created) => {
            const { body: fileWithURL } = await apiClient.v1.storage.post({
              body: {
                file: file,
                id: created.id,
                name: created.name,
                size: created.size,
                width: created.width,
                height: created.height
              }
            })
            props.onUpload(fileWithURL)
            setFile(fileWithURL)
          })
        }}
      />
      <Image
        width={'100%'}
        height={'100%'}
        radius={'50%'}
        fit={'cover'}
        src={file ? file.url ?? '/image.png' : '/image.png'}
      />
    </Wrap>
  )
}
