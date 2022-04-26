import { FlexBox } from '../atoms/box/flex'
import { useRecoilState, useRecoilValue } from 'recoil'
import { editItemParamState, themeColorState } from '~/states/atoms'
import { EditTextField } from '../molucules/edit-field-text'
import { EditSwitchField } from '../molucules/edit-field-switch'
import { NextRouter } from 'next/router'
import { ItemParam } from '$/node_modules/@prisma/client'

export const ItemParamEdit = (props: { router: NextRouter }) => {
  const color = useRecoilValue(themeColorState)
  const [itemParam, setItemParam] = useRecoilState(editItemParamState)

  const isTargetCollect = (itemParam: ItemParam | null) => {
    const id = props.router.asPath.split('/')[4]
    return !itemParam ? false : itemParam.id === id
  }

  if (itemParam === null || !isTargetCollect(itemParam)) {
    return <div></div>
  } else {
    return (
      <FlexBox
        way={'column'}
        gap={'18px'}
        border={{
          color: color.lightBorder,
          width: '1px',
          style: 'solid'
        }}
      >
        <EditTextField
          title={'パラメータ名'}
          subTitle={'Parameter Name'}
          description={`このパラメータの名前を設定します。`}
          defaultValue={itemParam.name}
          onInput={(s) => setItemParam({ ...itemParam, name: s })}
        />
        <EditTextField
          title={'パラメータID'}
          subTitle={'Parameter ID'}
          description={`このパラメータの名前を設定します。`}
          defaultValue={itemParam.paramId}
          onInput={(s) => setItemParam({ ...itemParam, paramId: s })}
        />
        <EditSwitchField
          title={'パラメータの必須化'}
          subTitle={'REQUIRED'}
          description={`アイテム作成時、このパラメータの入力における「必須・任意」を設定します。`}
          state={itemParam.isRequired}
          onSwitch={(s) => setItemParam({ ...itemParam, isRequired: s })}
        />
      </FlexBox>
    )
  }
}
