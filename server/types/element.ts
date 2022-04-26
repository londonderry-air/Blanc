import React from 'react'

export type ButtonProps = {
  title: string
  subTitle?: string
  width?: string
  color: string
  colors?: { background?: string; text?: string; border?: string }
  padding?: string
  isBorderHidden?: boolean
  isInactive?: boolean
  isInvisible?: boolean // For keeping layout
  size?: number
  onClick: () => void
}

export type ModalProps = {
  title: string
  subTitle?: string
  isVisible: boolean
  onOpen?: () => void
  onClose?: () => void
  buttons?: ButtonProps[]
  children?: React.ReactNode
}
