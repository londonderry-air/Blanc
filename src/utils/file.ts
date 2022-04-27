import { BlancFile } from '@prisma/client'
import { randomStr } from './variable'

export const createBlancFile = (
  file: File,
  callback: (file: BlancFile) => void
) => {
  const img = new Image()
  const reader = new FileReader()

  reader.onload = () => {
    const dataURL = reader.result

    img.onload = () => {
      const newFile: BlancFile = {
        id: randomStr(),
        name: file.name,
        size: file.size,
        url: null,
        width: img.naturalWidth,
        height: img.naturalHeight,
        created: new Date(),
        updated: new Date(),
        deleted: new Date(),
        dataURL: dataURL as string
      }

      callback(newFile)
    }

    img.src = URL.createObjectURL(file)
  }

  reader.readAsDataURL(file)
}
