import { useRecoilValue, useSetRecoilState } from 'recoil'
import { editCategoryState, editContentState } from '~/states/atoms'
import { CategoryList } from './category-list'

export const ContentEditCategory = () => {
  const content = useRecoilValue(editContentState)
  const setEditCategory = useSetRecoilState(editCategoryState)
  if (!content) return <></>
  return (
    <CategoryList
      categories={content.categories}
      onSelect={(category) => setEditCategory(category)}
    />
  )
}
