import { useRecoilValue } from 'recoil'
import { themeColorState } from '~/states/atoms'
import { OverBorderBox } from '../atoms/box/border'
import { FlexBox } from '../atoms/box/flex'
import { _Word } from '../atoms/text/_text'
import { moduler } from '~/utils/styles'

export const Validator = (props: {
    title: {
        local: string,
        global?: string
    },
    value: string,
    regex: RegExp
}) => {
    const color = useRecoilValue(themeColorState)
    const isValid = props.regex.test(props.value)
    return (
        <OverBorderBox
            width={'100%'}
          padding={'8px 0'}
          isActive={!isValid}
            borderColor={isValid ? color.text : color.caution}
        >
            <FlexBox way={'column'} gap={'3px'} margin={'0 0 0 10px'}>
                <_Word 
                    size={moduler(-2)} 
                    weight={'600'}
                    color={isValid ? color.text : color.cellText}
                >{props.title.local}</_Word>
                <_Word 
                    size={moduler(-4)} 
                    weight={'600'}
                    color={isValid ? color.text : color.cellText}
                >{props.title.global}</_Word>
            </FlexBox>
            </OverBorderBox>
    )
}