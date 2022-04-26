import { EditPost } from '$/types/post'
import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { FlexBox } from '../atoms/box/flex'
import { Box } from '../layout/box'
import { SideAreaField } from '../molucules/sidebar-field-area'
import { SideRadioField } from '../molucules/sidebar-field-radio'
import { SideTextField } from '../molucules/sidebar-field-text'
import { SideUploadField } from '../molucules/sidebar-field-upload'

export const PostEditSideSeo = (props: { post: EditPost }) => {
  const color = useRecoilValue(themeColorState)
  return (
    <Box padding={'1em'}>
      <FlexBox way={'column'} alignItems={'flex-start'}>
        <FlexBox
          way={'column'}
          gap={'1em'}
          border={{
            width: '1px',
            color: color.lightBorder,
            style: 'solid'
          }}
        >
          <SideTextField
            title={'タイトル'}
            subTitle={'Title'}
            description={`タイトルタグの内容を設定します。\nタイトルタグが空の場合は、この投稿のタイトルがタイトルタグの内容として設定されます。`}
            defaultValue={props.post.metaTitle ?? ''}
            onInput={(s) => (props.post.metaTitle = s)}
          />
          <SideAreaField
            title={'メタディスクリプション'}
            subTitle={'Meta Descrpition'}
            description={`メタディスクリプションを設定します。`}
            defaultValue={props.post.metaDescription ?? ''}
            onInput={(s) => (props.post.metaDescription = s)}
          />
          <SideUploadField
            title={'サムネイル（OGP）'}
            subTitle={'Thumbnail(OGP)'}
            description={`OGPにおける画像を設定します。`}
            defaultValue={props.post.metaOgImage}
            onChange={(file) => {
              props.post.metaOgImage = file
              props.post.metaOgImageId = file.id
            }}
          />
          <SideRadioField
            title={'タイプ（OGP）'}
            subTitle={'Type(OGP)'}
            description={`OGPにおけるこの投稿のタイプを設定します。\nトップページに該当する場合は「website」、それ以外に該当する場合は「article」を推奨します。`}
            values={['website', 'article']}
            selectedValue={props.post.metaOgType ?? ''}
            onChange={(s) => (props.post.metaOgType = s)}
          />
          <SideRadioField
            title={'カードタイプ（twitter）'}
            subTitle={'Card Type(twitter)'}
            description={`twitter上のシェア時における表示形式を設定します。`}
            values={['summary', 'summary_large_image']}
            selectedValue={props.post.metaTwitterCardType ?? ''}
            onChange={(s) => (props.post.metaTwitterCardType = s)}
          />
        </FlexBox>
      </FlexBox>
    </Box>
  )
}
