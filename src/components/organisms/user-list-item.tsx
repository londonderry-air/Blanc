import { BlancFile, BlancUser } from '@prisma/client'
import { Cluster } from '../layout/cluster'
import { _LargeH } from '../atoms/text/_text'
import { moduler } from '~/utils/styles'
import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { StackText } from '../atoms/text/stack'
import { FlexBox } from '../atoms/box/flex'
import { HoverBorderBox } from '../atoms/box/border'
import { Image } from '../atoms/image/image'
import { Link } from '../atoms/link/Link'
import { BorderBox } from '../atoms/box/border'
import { Box } from '../atoms/box/box'
import { DEFAULT_IMAGE } from '~/utils/variable'
import { _Word } from '../atoms/text/_text'
import { getTimeText } from '~/utils/date'

export const UserListItem = (props: {
  user: BlancUser & {
    image: BlancFile | null
  }
}) => {
  const color = useRecoilValue(themeColorState)
  return (
    <Link href={`/user/${props.user.id}`} width={'100%'}>
      <Box width={'100%'}>
        <HoverBorderBox
          padding={`${moduler(-1)} ${moduler(1)} ${moduler(-1)} ${moduler(1)}`}
          unhover={{width: '0em'}}
          hover={{width: '0.5em'}}
          color={color.text}
        >
          <Cluster
            justifyContent="flex-start"
            alignItem="center"
            gap={moduler(4)}
          >
            <Image
              width={'60px'}
              height={'60px'}
              src={
                props.user.image
                  ? props.user.image.url ?? DEFAULT_IMAGE
                  : DEFAULT_IMAGE
              }
              radius={'30px'}
              border={{
                width: '2px',
                style: 'solid',
                color: color.border
              }}
              fit={'cover'}
            />
            <Cluster justifyContent="space-between" alignItem="center">
              <FlexBox way={'column'} gap={moduler(-3)}>
                <_LargeH weight={'700'} size={moduler(-1)} color={color.text}>
                  {props.user.name}
                </_LargeH>
                <_Word
                  weight={'600'}
                  size={moduler(-3)}
                  color={color.inactive}
                >{`@${props.user.blancId}`}</_Word>
              </FlexBox>
              <Box>
                <Cluster alignItem="center">
                  <BorderBox
                    borderPosition={'left'}
                    borderWidth={'1px'}
                    borderColor={color.lightBorder}
                    borderStyle={'solid'}
                    padding={'0 0 0 1em'}
                  >
                    <FlexBox way={'row'} gap={'1em'} alignItems={'center'}>
                      <StackText
                        top={'最終ログイン'}
                        bottom={'Last Login'}
                        color={color.text}
                        size={-2}
                      />
                      <Box width={'16ch'}>
                        {props.user.isOnline && (
                          <_Word
                            size={moduler(3)}
                            weight={'700'}
                            color={color.active}
                          >
                            ACTIVE
                          </_Word>
                        )}
                        {!props.user.isOnline && !props.user.isFirstLogin && (
                          <_Word weight={'600'} color={color.text}>
                            {getTimeText(new Date(props.user.lastLogin))}
                          </_Word>
                        )}
                        {props.user.isFirstLogin && (
                          <_Word
                            weight={'700'}
                            color={color.warning}
                            size={moduler(3)}
                          >
                            INVITING
                          </_Word>
                        )}
                      </Box>
                    </FlexBox>
                  </BorderBox>
                </Cluster>
              </Box>
            </Cluster>
          </Cluster>
        </HoverBorderBox>
      </Box>
    </Link>
  )
}
