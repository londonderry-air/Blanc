import { ThemeColor } from '$/types/color'

export const color = {
  black: '#282836',
  white: '#FFFFFF',
  gray: '#84919e',
  darkgray: '#707070',
  lightgray: '#F0F0F0',
  green: '#00b06b',
  lightgreen: '#4DE539',
  red: '#FF4B00',
  lightred: '#FF5F5F',
  yellow: '#F6AA00',
  lightyellow: '#FFB43C'
}

export const theme = {
  light: <ThemeColor>{
    text: color.black,
    cellText: color.white,
    grayText: color.gray,
    background: color.white,
    border: color.black,
    lightBorder: color.gray,
    active: color.green,
    inactive: color.gray,
    warning: color.yellow,
    caution: color.red,
    lightActive: color.lightgreen,
    lightInactive: color.gray,
    lightWarning: color.lightyellow,
    lightCaution: color.lightred,
    fieldBackground: color.lightgray
  },
  dark: <ThemeColor>{
    text: color.white,
    cellText: color.white,
    grayText: color.gray,
    background: color.black,
    border: color.white,
    lightBorder: color.gray,
    active: color.green,
    inactive: color.gray,
    warning: color.yellow,
    caution: color.red,
    lightActive: color.lightgreen,
    lightInactive: color.gray,
    lightWarning: color.lightyellow,
    lightCaution: color.lightred,
    fieldBackground: color.lightgray
  }
}

export const randomStr = () => Math.random().toString(36).slice(-8)
export const DEFAULT_IMAGE = '/blanc.png'
