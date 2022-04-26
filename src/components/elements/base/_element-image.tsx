/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { AnimateLoader } from '~/components/animation/animate-loader'
import { BorderBox } from '~/components/atoms/box/border'
import { FlexBox } from '~/components/atoms/box/flex'
import { Image as ImageElm } from '~/components/atoms/image/image'
import { StackText } from '~/components/atoms/text/stack'
import { deleteFileList, themeColorState, uploadFileList } from '~/states/atoms'
import { BlancFile } from '@prisma/client'
import { createBlancFile } from '~/utils/file'
import { apiClient } from '~/utils/apiClient'

export const _ElementImage = (props: {
  file: BlancFile
  width: string
  height: string
  radius?: string
  isFitImage?: boolean
  fitBase?: 'width' | 'height'
  onChange: (f: BlancFile) => void
}) => {
  const color = useRecoilValue(themeColorState)
  const imgRef = useRef(null!) as React.MutableRefObject<HTMLDivElement>
  const fitBase = props.fitBase ?? 'width'
  const [isDragOver, setDragOverState] = useState(false)
  const [isImageLoading, setImageLoadingState] = useState(false)
  const [id, setId] = useState(props.file ? props.file.id : '')
  const [src, setSrc] = useState<string | null>(
    props.file.dataURL ?? props.file.url ?? '/moon.png'
  )
  const [uploads, setUploads] = useRecoilState(uploadFileList)
  const [deletes, setDeletes] = useRecoilState(deleteFileList)
  const [imgSize, setImgSize] = useState<{
    width: number
    height: number
  } | null>(null)
  const [imgElmSize, setImgElmSize] = useState<{
    width: string
    height: string
  }>({ width: 'auto', height: 'auto' })

  const getWidth = () =>
    props.isFitImage
      ? props.fitBase === 'width'
        ? props.width
        : `${imgElmSize.width}`
      : props.width
  const getHeight = () =>
    props.isFitImage
      ? props.fitBase === 'height'
        ? props.height
        : `${imgElmSize.height}`
      : props.width

  const preventTransition = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const onDropFile = async (newFile: File) => {
    createBlancFile(newFile, async (created) => {
      const filesWithoutOldFile = uploads.filter(
        (upload) => upload.file.id !== id
      )
      const { body: fileWithURL } = await apiClient.v1.storage.post({
        body: {
          file: newFile,
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
      setSrc(fileWithURL.url ?? '')
      setImgSize({ width: fileWithURL.width, height: fileWithURL.height })
      setImageLoadingState(false)
      props.onChange(fileWithURL)
    })
  }

  useEffect(() => {
    console.log(uploads)
    console.log(deletes)
  }, [uploads, deletes])

  const resetDataURL = () => setSrc(null)

  useEffect(() => {
    setTimeout(() => {
      if (props.isFitImage && imgRef.current && imgSize) {
        const size = imgRef.current.getBoundingClientRect()
        switch (fitBase) {
          case 'width':
            setImgElmSize({
              width: `${size.width}px`,
              height: `${(size.width / imgSize.width) * imgSize.height}px`
            })
            break
          case 'height':
            setImgElmSize({
              width: `${(size.height / imgSize.height) * imgSize.width}px`,
              height: `${size.height}px`
            })
            break
        }
      }
    }, 0)
  }, [imgSize])

  useEffect(() => {
    if (props.file.width !== 0 && props.file.height !== 0) {
      setImgSize({
        width: props.file.width,
        height: props.file.height
      })
    }
  }, [imgRef.current])

  return useMemo(
    () => (
      <BorderBox
        borderPosition={'all'}
        borderWidth={'3px'}
        borderColor={isDragOver ? color.active : color.fieldBackground}
        borderStyle={'dashed'}
        width={getWidth()}
        height={getHeight()}
        boxSizing={'content-box'}
      >
        <FlexBox
          way={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          width={getWidth()}
          height={getHeight()}
          minHeight={'200px'}
          background={color.background}
          onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
            preventTransition(e)
            setDragOverState(true)
          }}
          onDragLeave={() => setDragOverState(false)}
          onDrop={(e: React.DragEvent<HTMLDivElement>) => {
            preventTransition(e)
            setDragOverState(false)
            if (e.dataTransfer.files.length > 0) {
              resetDataURL()
              onDropFile(e.dataTransfer.files[0])
              setImageLoadingState(true)
            }
          }}
        >
          {src === null && (
            <StackText
              top={
                isImageLoading
                  ? 'アップロード中...'
                  : isDragOver
                  ? 'ドロップしてファイルをアップロードする'
                  : 'ドラッグ & ドロップでファイルをアップロードする'
              }
              bottom={
                isImageLoading
                  ? 'Uploading...'
                  : isDragOver
                  ? 'Upload File'
                  : 'Drag Upload File Here'
              }
              color={color.text}
              size={-1}
            />
          )}
          {src !== null && (
            <ImageElm
              width={getWidth()}
              height={getHeight()}
              src={(src as string) ?? props.file.dataURL}
              ref={imgRef}
              fit={'cover'}
              radius={props.radius}
            />
          )}
          {isImageLoading && <AnimateLoader />}
        </FlexBox>
      </BorderBox>
    ),
    [src, imgElmSize, isImageLoading, isDragOver]
  )
}
