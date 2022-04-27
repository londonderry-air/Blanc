import { Category } from '@prisma/client'
import { useRecoilState, useRecoilValue } from 'recoil'
import { editCategoryState, themeColorState } from '~/states/atoms'
import { EditTextField } from '../molucules/edit-field-text'
import { FlexBox } from '../atoms/box/flex'
import { NextRouter } from 'next/router'

export const CategoryEdit = (props: { router: NextRouter }) => {
  const color = useRecoilValue(themeColorState)
  const [category, setEditCategory] = useRecoilState(editCategoryState)

  const isTargetCollect = (category: Category | null) => {
    const id = props.router.asPath.split('/')[4]
    return !category ? false : category.id === id
  }

  if (category === null || !isTargetCollect(category)) {
    return <div></div>
  } else {
    return (
      <FlexBox
        way={'column'}
        gap={'18px'}
        border={{
          width: '1px',
          style: 'solid',
          color: color.lightBorder
        }}
      >
        <EditTextField
          title={'カテゴリー名'}
          subTitle={'Category Name'}
          description={`このカテゴリーの名前を設定します。`}
          defaultValue={category ? category.name : ''}
          onInput={(s) => {
            setEditCategory({ ...category, name: s })
          }}
        />
      </FlexBox>
    )
  }
}
