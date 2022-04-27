import { Box } from '~/components/layout/box'
import { moduler } from '~/utils/styles'
import { HomeHeader } from '~/components/molucules/home-header'
import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { HomeTextFilter } from '~/components/molucules/home-filter-text'
import { HomeCheckBoxFilter } from '~/components/molucules/home-filter-checkbox'
import { useState } from 'react'
import { HomeSelectListFilter } from '~/components/molucules/home-filter-selectlist'

const Page = () => {
  const color = useRecoilValue(themeColorState)
  const [s, setS] = useState(false)
  const [sl, setSl] = useState<string>()
  const [isFilterOpen, setFilterOpen] = useState(false)
  const lst = [
    'Sample01',
    'Sample02',
    'Sample03',
    'Sample04',
    'Sample05',
    'Sample06',
    'Sample07',
    'Sample08',
    'Sample09',
    'Sample10'
  ]
  return (
    <Box padding={`${moduler(0)} ${moduler(12)} 0 ${moduler(12)}`}>
      <HomeHeader
        title="設定"
        subTitle="SETTINGS"
        buttons={[
          {
            title: '保存',
            subTitle: 'SAVE',
            color: color.text,
            onClick: () => console.log('create New')
          }
        ]}
      />
      <HomeTextFilter
        title="検索"
        subTitle="SEARCH"
        onInput={(str) => console.log(str)}
      />
      <HomeCheckBoxFilter
        local="公開中"
        global="PUBLISH"
        onChange={(e) => {
          console.log(e)
          setS(!s)
        }}
        isActive={s}
      />
      <HomeSelectListFilter
        title="コンテンツ"
        subTitle="CONTENT"
        list={lst}
        selectedValue={sl}
        placeholder={'--placeholder--'}
        onChange={(v: string | number) => setSl(v as string)}
        isOpen={isFilterOpen}
        onOpen={(b) => setFilterOpen(b)}
      ></HomeSelectListFilter>
    </Box>
  )
}

export default Page
