import { atom } from 'recoil'
import { ThemeColor } from '$/types/color'
import { Locale } from '$/types/locale'
import { theme } from '~/utils/variable'
import { ModalProps } from '$/types/element'
import {
  BlancFile,
  Category,
  ItemParam,
  Post
} from '@prisma/client'
import { ItemWithRelation } from '$/types/item'
import { BlancUserWithRelation } from '$/types/user'
import { ContentWithRelation } from '$/types/content'
import { NotifierState } from '~/components/molucules/notifier'

export const localeState = atom<Locale>({
  key: 'locale',
  default: 'ja-JP'
})

export const themeColorState = atom<ThemeColor>({
  key: 'themeColor',
  default: theme.light
})

export const modalState = atom<ModalProps>({
  key: 'modal',
  default: {
    title: '',
    subTitle: '',
    isVisible: false,
    buttons: []
  }
})

export const editPostState = atom<Post | null>({
  key: 'editPost',
  default: null
})

export const editItemState = atom<ItemWithRelation | null>({
  key: 'editItem',
  default: null
})

export const editContentState = atom<ContentWithRelation | null>({
  key: 'editContent',
  default: null
})

export const editCategoryState = atom<Category | null>({
  key: 'editCategory',
  default: null
})

export const editBlancUserState = atom<BlancUserWithRelation | null>({
  key: 'editBlancUser',
  default: null
})

export const editItemParamState = atom<ItemParam | null>({
  key: 'editItemParam',
  default: null
})

export const uploadFileList = atom<{ blob: File; file: BlancFile }[]>({
  key: 'uploadFile',
  default: []
})

export const deleteFileList = atom<BlancFile['id'][]>({
  key: 'deleteFile',
  default: []
})

export const notifierState = atom<{
  state: NotifierState
  message: { main: string; sub?: string }
} | null>({
  key: 'notifier',
  default: null
})
