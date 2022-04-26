import { moduler } from '~/utils/styles'
import { _Sentence } from '../atoms/text/_text'

export const FieldDesc = (props: {
  color: string
  description: string
  size?: number
}) => (
  <_Sentence
    weight={'400'}
    size={props.size ? moduler(props.size) : moduler(-3)}
    color={props.color}
  >
    {props.description}
  </_Sentence>
)
