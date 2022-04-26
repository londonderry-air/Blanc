import { PublishStatus } from '$/types/status'
import { getPublishStateColor, getPublishStateText } from '~/utils/status'
import { moduler } from '~/utils/styles'
import { Cell } from './cell'

export const PublishCell = (props: { state: PublishStatus }) => {
  const statusText = getPublishStateText(props.state)
  const statusColor = getPublishStateColor(props.state)
  return (
    <Cell
      title={statusText.local}
      subTitle={statusText.global}
      padding={`${moduler(-8)} ${moduler(4)}`}
      width={'16ch'}
      colors={{
        text: statusColor.text,
        background: statusColor.background,
        border: statusColor.border
      }}
    />
  )
}
