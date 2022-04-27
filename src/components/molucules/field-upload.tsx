import { Image } from '../atoms/image/image'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { deleteFileList, themeColorState, uploadFileList } from '~/states/atoms'
import { moduler } from '~/utils/styles'
import { _Word } from '../atoms/text/_text'
import { Stack } from '../layout/stack'
import { LabelTextList } from '../atoms/text/label'
import { StackText } from '../atoms/text/stack'
import { BlancFile } from '@prisma/client'
import { createBlancFile } from '~/utils/file'
import { BorderBox } from '../atoms/box/border'
import { Box } from '../atoms/box/box'
import { FlexBox } from '../atoms/box/flex'
import { formatBytes } from '~/utils/math'
import { apiClient } from '~/utils/apiClient'

export const Upload = (props: {
  defaultValue: BlancFile | null
  onUpload: (file: BlancFile) => void
}) => {
  const color = useRecoilValue(themeColorState)
  const [uploads, setUploads] = useRecoilState(uploadFileList)
  const [deletes, setDeletes] = useRecoilState(deleteFileList)
  const [isDrag, setDragState] = useState(false)
  const [id, setId] = useState(props.defaultValue ? props.defaultValue.id : '')
  const [file, setFile] = useState<BlancFile | null>(props.defaultValue ?? null)

  const onDropFiles = (e: React.DragEvent<HTMLDivElement>) => {
    const files = e.dataTransfer.files
    const newFile = files[0]
    createBlancFile(newFile, async (created) => {
      const filesWithoutOldFile = uploads.filter(
        (upload) => upload.file.id !== id
      )
      const { body: fileWithURL } = await apiClient.v1.storage.post({
        body: {
          file: files[0],
          id: created.id,
          name: created.name,
          size: created.size,
          width: created.width,
          height: created.height
        }
      })
      setUploads([...filesWithoutOldFile, { blob: newFile, file: created }])
      setDeletes([...deletes, id])
      setId(fileWithURL.id)
      setFile(fileWithURL)
      props.onUpload(fileWithURL)
    })
  }

  return (
    <BorderBox
      background={color.inactive}
      padding={'10px 10px'}
      borderPosition={'all'}
      borderWidth={'0px'}
      borderStyle={'solid'}
      borderColor={color.border}
      radius={'10px'}
    >
      <Stack margin={'6px'}>
        <UploadArea
          onDrop={(e) => onDropFiles(e)}
          isDrag={isDrag}
          setDragState={setDragState}
        ></UploadArea>
        <UploadDisplay
          isVisible={!isDrag}
          file={file}
          color={{
            background: color.background,
            border: color.border,
            text: {
              title: color.text,
              info: color.lightInactive
            }
          }}
        />
      </Stack>
    </BorderBox>
  )
}

const UploadDisplay = (props: {
  file: BlancFile | null
  isVisible: boolean
  color: {
    background: string
    border: string
    text: {
      title: string
      info: string
    }
  }
}) => {
  return (
    <BorderBox
      height={props.file ? '3em' : '0'}
      borderPosition={'all'}
      borderWidth={'0px'}
      borderStyle={'solid'}
      borderColor={props.color.border}
      radius={'6px'}
      padding={props.file ? '1em 0.5em' : '0em 0.5em'}
      background={props.color.background}
      overflow={{ y: 'hidden' }}
      boxSizing={'content-box'}
    >
      <FlexBox height={'3em'} way={'row'} gap={'1em'} alignItems={'center'}>
        <Image
          width={'3em'}
          height={'3em'}
          fit={'cover'}
          radius={'1.5em'}
          border={{
            width: '2px',
            color: props.color.border,
            style: 'solid'
          }}
          src={props.file ? props.file.url ?? props.file.dataURL ?? '' : ''}
        />
        <Box>
          <FlexBox way={'column'} gap={'6px'}>
            <_Word
              weight={'600'}
              size={moduler(-2)}
              color={props.color.text.title}
            >
              {props.file ? props.file.name : 'EMPTY'}
            </_Word>
            <LabelTextList
              list={[
                {
                  label: 'File Size',
                  value: formatBytes(props.file ? props.file.size : 0)
                }
              ]}
              color={props.color.text.info}
            />
          </FlexBox>
        </Box>
      </FlexBox>
    </BorderBox>
  )
}

const UploadArea = (props: {
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void
  isDrag: boolean
  setDragState: Dispatch<SetStateAction<boolean>>
}) => {
  const color = useRecoilValue(themeColorState)
  const preventTransition = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()
  }

  return (
    <BorderBox
      radius={'6px'}
      borderPosition={'all'}
      borderWidth={'3px'}
      borderStyle={'dashed'}
      borderColor={props.isDrag ? color.background : color.background}
      background={props.isDrag ? color.background : 'transparent'}
      padding={`${moduler(10)} ${moduler(1)}`}
      onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
        preventTransition(e)
        props.setDragState(true)
      }}
      onDragLeave={() => props.setDragState(false)}
      onDrop={(e: React.DragEvent<HTMLDivElement>) => {
        preventTransition(e)
        props.setDragState(false)
        props.onDrop(e)
      }}
    >
      <StackText
        top={
          props.isDrag
            ? 'ドロップしてファイルをアップロードする'
            : `ファイルをドラッグしてください`
        }
        bottom={props.isDrag ? 'Upload File' : 'Drag Upload File Here'}
        color={props.isDrag ? color.text : color.cellText}
        size={-2}
      />
    </BorderBox>
  )
}
