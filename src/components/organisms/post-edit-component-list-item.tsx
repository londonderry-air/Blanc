import { BlancComponent } from '$/types/_element'
import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { BorderBox } from '../atoms/box/border'
import { HoverFadeBox } from '../atoms/box/fade'
import { _Word } from '../atoms/text/_text'
import { moduler } from '~/utils/styles'
import { FlexBox } from '../atoms/box/flex'

export const PostEditComponentListItem = (props: {
  component: BlancComponent
  onClick: (type: BlancComponent) => void
}) => {
  const color = useRecoilValue(themeColorState)
  const [group, name] = props.component.split('-')
  return (
    <HoverFadeBox
      width={'100%'}
      background={color.background}
      amount={{
        fadein: '0.5',
        fadeout: '1'
      }}
      onClick={() => props.onClick(props.component)}
    >
      <BorderBox
        width={'100%'}
        padding={'12px 8px'}
        borderPosition={'all'}
        radius={'2px'}
        borderColor={color.text}
        borderWidth={'2px'}
        borderStyle={'solid'}
      >
        <FlexBox way={'column'} gap={'8px'}>
          <_Word
            size={moduler(-1)}
            weight={'600'}
            color={color.text}
            h_space={'0.02em'}
          >
            {name.toUpperCase()}
          </_Word>
          <_Word size={moduler(-4)} weight={'500'} color={color.text}>
            {group.toUpperCase()}
          </_Word>
        </FlexBox>
      </BorderBox>
    </HoverFadeBox>
  )
}
