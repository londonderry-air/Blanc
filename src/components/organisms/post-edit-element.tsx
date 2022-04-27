import { BlancComponent, BlancElement } from '$/types/$element'
import dynamic from 'next/dynamic'
import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { FlexBox } from '../atoms/box/flex'
import { AlignBox } from '../atoms/box/align'
import { Button } from '../atoms/button/button'
import { StackText } from '../atoms/text/stack'
import { HoverFadeBox } from '../animation/aniamte-hover-fade-box'
import { Box } from '../atoms/box/box'
import { Post } from '$/node_modules/@prisma/client'

export const PostEditElement = (props: {
  post: Post
  element: BlancElement
  onDelete: (elm: BlancElement) => void
}) => {
  const [group, name] = props.element.component.split('-')
  const color = useRecoilValue(themeColorState)
  const element = (component: BlancComponent) => {
    const [group, name] = component.split('-')
    return dynamic<BlancElement>(
      () => import(`src/components/elements/${group}/blanc-element-${name}`)
    )
  }
  const Element = element(props.element.component)
  return (
    <FlexBox way={'column'} width={'100%'}>
      <HoverFadeBox
        amount={{
          fadein: '1',
          fadeout: '0.1'
        }}
      >
        <AlignBox width={'25%'} align={'right'} position={'absolute'}>
          <FlexBox
            background={color.border}
            way={'row'}
            gap={'2em'}
            alignItems={'center'}
            justifyContent={'space-between'}
            padding={'6px 20px 3px 20px'}
            radius={'0px 0px 0px 10px'}
          >
            <StackText
              top={name.toUpperCase()}
              bottom={group.toUpperCase()}
              color={color.cellText}
              isCenter={false}
              size={-3}
            />

            <Button
              title={'削除'}
              padding={'0.4em'}
              color={'#212121'}
              colors={{
                border: 'transparent',
                text: color.cellText,
                background: color.caution
              }}
              size={-5}
              onClick={() => props.onDelete(props.element)}
            />
          </FlexBox>
        </AlignBox>
      </HoverFadeBox>
      <Box width={'100%'}>
        <Element
          id={props.element.id}
          component={props.element.component}
          data={props.element.data}
          post={props.post}
        />
      </Box>
    </FlexBox>
  )
}
