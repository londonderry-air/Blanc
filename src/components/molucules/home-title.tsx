import { _MainH, _MidH } from '~/components/atoms/text/_text'
import { Cluster } from '~/components/layout/cluster'
import { moduler } from '~/utils/styles'

export const HomeTitle = (props: { title: string; subTitle: string }) => {
  return (
    <Cluster alignItem="baseline">
      <_MainH size={moduler(5)} weight={'700'}>
        {props.title}
      </_MainH>
      <_MidH size={moduler(-3)} weight={'600'}>
        {props.subTitle}
      </_MidH>
    </Cluster>
  )
}
