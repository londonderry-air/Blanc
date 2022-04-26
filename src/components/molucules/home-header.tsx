import { ButtonProps } from '$/types/element'
import { Button } from '~/components/atoms/button/button'
import { Cluster } from '~/components/layout/cluster'
import { HomeTitle } from '~/components/molucules/home-title'

export const HomeHeader = (props: {
  title: string
  subTitle: string
  buttons: ButtonProps[]
}) => {
  return (
    <Cluster justifyContent="space-between" alignItem="center">
      <HomeTitle title={props.title} subTitle={props.subTitle} />
      <Cluster justifyContent="flex-end" alignItem="center">
        {props.buttons.map((btn, i) => (
          <Button
            key={i}
            title={btn.title}
            subTitle={btn.subTitle}
            color={btn.color}
            colors={btn.colors}
            isInactive={btn.isInactive}
            isInvisible={btn.isInvisible}
            onClick={() => btn.onClick()}
          ></Button>
        ))}
      </Cluster>
    </Cluster>
  )
}
