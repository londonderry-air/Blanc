import { _CheckBox, _CheckBoxInput } from '../atoms/field/_field'

export const CheckBox = (props: {
  id: string
  isActive: boolean
  background: string
  activeColor: string
  onChange: (state: string) => void
}) => {
  return (
    <>
      <_CheckBox
        htmlFor={props.id}
        isActive={props.isActive}
        background={props.background}
        activeColor={props.activeColor}
      />
      <_CheckBoxInput
        type="checkbox"
        name={props.id}
        id={props.id}
        onChange={() => {
          props.onChange(props.id)
        }}
      />
    </>
  )
}
