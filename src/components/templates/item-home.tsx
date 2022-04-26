import { BlancFile, Content, Item } from '$/node_modules/@prisma/client'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { modalState, themeColorState } from '~/states/atoms'
import { HomeBox } from '../molucules/home-box'
import { ItemList } from '../organisms/item-list'
import { HomeHeader } from '../molucules/home-header'
import { ItemFilter } from '../organisms/item-filter'
import { ModalContentSelect } from '../organisms/modal-content-select'
import { ButtonProps } from '$/types/element'

export const ItemHome = (props: {
  items: (Item & {
    thumbnail: BlancFile | null
  })[]
  contents: Content[]
  onCreate: (c: Content) => void
}) => {
  const color = useRecoilValue(themeColorState)
  const [modal, setModal] = useRecoilState(modalState)
  const [content, setContent] = useState<Content | null>(null)
  const [isFilterOpen, setFilterOpen] = useState(false)
  const getModalButton = (isActive: boolean): ButtonProps[] => [
    {
      title: '作成する',
      subTitle: 'CREATE',
      color: color.text,
      isInactive: !isActive,
      onClick: () => {
        if (content) {
          props.onCreate(content)
        }
        setModal({ title: modal.title, isVisible: false })
        setContent(null)
      }
    }
  ]

  useEffect(() => {
    if (!content) return
    setModal({
      title: 'アイテムを作成する',
      subTitle: 'Create New Item',
      isVisible: true,
      buttons: getModalButton(true),
      onClose: () => setContent(null),
      children: (
        <ModalContentSelect
          contents={props.contents}
          onSelect={(c) => {
            setContent(c)
          }}
        />
      )
    })
  }, [content])

  return (
    <>
      <HomeBox>
        <HomeHeader
          title="アイテム"
          subTitle="ITEM"
          buttons={[
            {
              title: 'フィルター',
              subTitle: 'FILTER',
              color: isFilterOpen ? color.text : color.lightInactive,
              colors: {
                background: color.background,
                border: isFilterOpen ? color.text : color.fieldBackground,
                text: isFilterOpen ? color.text : color.fieldBackground
              },
              onClick: () => setFilterOpen(!isFilterOpen)
            },
            {
              title: '新規作成',
              subTitle: 'CREATE',
              color: color.text,
              onClick: () => {
                setContent(null)
                setModal({
                  title: 'アイテムを作成する',
                  subTitle: 'Create New Item',
                  isVisible: true,
                  onClose: () => setContent(null),
                  buttons: getModalButton(false),
                  children: (
                    <ModalContentSelect
                      contents={props.contents}
                      onSelect={(c) => {
                        setContent(c)
                      }}
                    />
                  )
                })
              }
            }
          ]}
        />
        <ItemFilter
          isFilterOpen={isFilterOpen}
          items={props.items}
          contents={props.contents}
          onFiltered={(items: Item[]) => console.log(items)}
          onFilterOpen={(b) => setFilterOpen(b)}
        />
        <ItemList
          items={props.items}
          contents={props.contents}
          isFilterOpen={isFilterOpen}
        />
      </HomeBox>
    </>
  )
}
