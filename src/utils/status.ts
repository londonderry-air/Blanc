import { useRecoilValue } from 'recoil'
import { localeState, themeColorState } from '~/states/atoms'
import { PublishStatus, StatusText } from '$/types/status'
import { getLocalWord } from './locale'

export const getPublishStateText = (state: PublishStatus): StatusText => {
  const locale = useRecoilValue(localeState)
  switch (state) {
    case 'publish':
      return {
        local: getLocalWord('publish', locale),
        global: getLocalWord('publish')
      }
    case 'draft':
      return {
        local: getLocalWord('draft', locale),
        global: getLocalWord('draft')
      }
    case 'comingsoon':
      return {
        local: getLocalWord('comingsoon', locale),
        global: getLocalWord('comingsoon')
      }
    case 'expired':
      return {
        local: getLocalWord('expired', locale),
        global: getLocalWord('expired')
      }
  }
}

export const getPublishStateColor = (state: PublishStatus) => {
  const color = useRecoilValue(themeColorState)
  switch (state) {
    case 'publish':
      return {
        border: color.lightActive,
        background: color.active,
        text: color.cellText
      }
    case 'draft':
      return {
        border: color.lightInactive,
        background: color.inactive,
        text: color.cellText
      }
    case 'comingsoon':
      return {
        border: color.lightWarning,
        background: color.warning,
        text: color.cellText
      }
    case 'expired':
      return {
        border: color.lightCaution,
        background: color.caution,
        text: color.cellText
      }
  }
}
