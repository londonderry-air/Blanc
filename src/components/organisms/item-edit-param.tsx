/* eslint-disable @typescript-eslint/no-explicit-any */
import { ItemParam, Prisma } from '$/node_modules/@prisma/client'
import { FlexBox } from '../atoms/box/flex'
import { SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil'
import { editItemState, themeColorState } from '~/states/atoms'
import { EditTextField } from '../molucules/edit-field-text'
import { EditUploadField } from '../molucules/edit-field-upload'
import { ItemParamType, ItemWithRelation } from '$/types/item'
import { EditAreaField } from '../molucules/edit-field-area'
import { EditSwitchField } from '../molucules/edit-field-switch'

export const ItemEditParam = () => {
  const [item, setItem] = useRecoilState(editItemState)
  const color = useRecoilValue(themeColorState)

  if (!item) return <></>

  return (
    <FlexBox
      way={'column'}
      gap={'36px'}
      border={{
        color: color.lightBorder,
        width: '1px',
        style: 'solid'
      }}
    >
      {item.content?.itemParams.map((param, i) => (
        <EditField key={i} item={item} param={param} setter={setItem} />
      ))}
    </FlexBox>
  )
}

const EditField = (props: {
  item: ItemWithRelation
  param: ItemParam
  setter: SetterOrUpdater<ItemWithRelation | null>
}) => {
  switch (props.param.type as ItemParamType) {
    case 'text':
      return (
        <EditTextField
          title={props.param.name}
          subTitle={props.param.paramId}
          description={''}
          defaultValue={
            ((props.item.data as Prisma.JsonObject)[
              props.param.paramId
            ] as string) ?? ''
          }
          onInput={(s) => {
            const copied = { ...(props.item.data as Prisma.JsonObject) }
            copied[props.param.paramId] = s
            props.setter({ ...props.item, data: copied })
          }}
        />
      )
    case 'area':
      return (
        <EditAreaField
          title={props.param.name}
          subTitle={props.param.paramId}
          description={''}
          defaultValue={
            ((props.item.data as Prisma.JsonObject)[
              props.param.paramId
            ] as string) ?? ''
          }
          onInput={(s) => {
            const copied = { ...(props.item.data as Prisma.JsonObject) }
            copied[props.param.paramId] = s
            props.setter({ ...props.item, data: copied })
          }}
        />
      )
    case 'switch':
      return (
        <EditSwitchField
          title={props.param.name}
          subTitle={props.param.paramId}
          description={''}
          state={
            ((props.item.data as Prisma.JsonObject)[
              props.param.paramId
            ] as boolean) ?? false
          }
          onSwitch={(s) => {
            const copied = { ...(props.item.data as Prisma.JsonObject) }
            copied[props.param.paramId] = s
            props.setter({ ...props.item, data: copied })
          }}
        />
      )
    case 'number':
      return (
        <EditTextField
          title={props.param.name}
          subTitle={props.param.paramId}
          description={''}
          defaultValue={
            ((props.item.data as Prisma.JsonObject)[
              props.param.paramId
            ] as string) ?? ''
          }
          onInput={(s) => {
            const copied = { ...(props.item.data as Prisma.JsonObject) }
            copied[props.param.paramId] = s
            props.setter({ ...props.item, data: copied })
          }}
        />
      )
    case 'image':
      return (
        <EditUploadField
          title={props.param.name}
          subTitle={props.param.paramId}
          description={''}
          defaultValue={
            ((props.item.data as Prisma.JsonObject)[
              props.param.paramId
            ] as any) ?? null
          }
          onChange={(file) => {
            const copied = { ...(props.item.data as Prisma.JsonObject) }
            copied[props.param.paramId] = file as any
            props.setter({ ...props.item, data: copied })
          }}
        />
      )
    default:
      return (
        <EditTextField
          title={props.param.name}
          subTitle={props.param.paramId}
          description={''}
          defaultValue={
            ((props.item.data as Prisma.JsonObject)[
              props.param.paramId
            ] as string) ?? ''
          }
          onInput={(s) => {
            const copied = { ...(props.item.data as Prisma.JsonObject) }
            copied[props.param.paramId] = s
            props.setter({ ...props.item, data: copied })
          }}
        />
      )
  }
}
