import { ItemParam } from '@prisma/client'
import { WordListKey } from '$/types/locale'
import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { getLocalWord } from '~/utils/locale'
import { AnimateHoverBorderBox } from '../animation/animate-hover-border-box'
import { FlexBox } from '../atoms/box/flex'
import { BorderBox } from '../atoms/box/border'
import { StateCell } from '../atoms/cell/state'
import { StackText } from '../atoms/text/stack'
import { Cell } from '../atoms/cell/cell'
import { Cluster } from '../layout/cluster'
import { Box } from '../atoms/box/box'
import { Link } from '../atoms/link/Link'
import { moduler } from '~/utils/styles'

export const ItemParamListItem = (props: { param: ItemParam }) => {
  const color = useRecoilValue(themeColorState)
  return (
    <Link
      width={'100%'}
      href={`/content/${props.param.contentId}/item/${props.param.id}`}
    >
      <Box width={'100%'}>
        <AnimateHoverBorderBox
          color={color.border}
          padding={'0.4em 0.75em'}
          unhoverWidth={'0em'}
          hoverWidth={'0.4em'}
        >
          <Cluster justifyContent="space-between">
            <StackText
              top={props.param.name}
              bottom={props.param.paramId}
              color={color.text}
              isCenter={false}
              size={-1}
            />
            <Box>
              <Cluster>
                <BorderBox
                  padding={'0 0 0 1em'}
                  borderPosition={'left'}
                  borderWidth={'1px'}
                  borderColor={color.lightBorder}
                  borderStyle={'solid'}
                >
                  <FlexBox way={'row'} gap={'1em'} alignItems={'center'}>
                    <StackText
                      top={'型'}
                      bottom={'TYPE'}
                      color={color.text}
                      size={-2}
                    />
                    <Cell
                      width={'18ch'}
                      padding={`${moduler(-4)} ${moduler(3)}`}
                      title={getLocalWord(
                        props.param.type as WordListKey,
                        'ja-JP'
                      )}
                      subTitle={props.param.type.toUpperCase()}
                      colors={{
                        background: color.background,
                        border: color.border,
                        text: color.text
                      }}
                    />
                  </FlexBox>
                </BorderBox>
                <BorderBox
                  padding={'0 0 0 1em'}
                  borderPosition={'left'}
                  borderWidth={'1px'}
                  borderColor={color.lightBorder}
                  borderStyle={'solid'}
                >
                  <StateCell
                    state={props.param.isRequired}
                    title={{
                      active: '必須',
                      inactive: '任意'
                    }}
                    subTitle={{
                      active: 'REQUIRED',
                      inactive: 'NOT REQUIRED'
                    }}
                    width={'18ch'}
                  />
                </BorderBox>
              </Cluster>
            </Box>
          </Cluster>
        </AnimateHoverBorderBox>
      </Box>
    </Link>
  )
}
