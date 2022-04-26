import { BlancElement } from '$/types/$element'
import styled from 'styled-components'
import { moduler } from '~/utils/styles'
import {
  BlancElementText,
  BlancTextElementProps
} from '../base/blanc-element-text'

export const BlancCommonLink = (props: BlancCommonTextProps) => {
  if (!props.data.url) {
    props.data.url = {}
  }
  if (!props.data.title) {
    props.data.title = {}
  }

  return (
    <Wrap>
      <HeadWrap>
        <Word>LINK</Word>
      </HeadWrap>
      <BlancElementText
        data={props.data.title}
        font={{ size: '1em', weight: '600' }}
        color={'#FFFFFF'}
        markup={'p'}
        placeholder={'テキストを入力してください'}
        isOneLine={true}
      />
      <URLWrap>
        <URLWord>URL:</URLWord>
        <BlancElementText
          width={'100%'}
          data={props.data.url}
          font={{ size: moduler(-3), weight: '600' }}
          color={'#FFFFFF99'}
          markup={'p'}
          placeholder={'リンクを入力してください'}
          isOneLine={true}
        />
      </URLWrap>
    </Wrap>
  )
}

const Wrap = styled.a`
  width: 60ch;
  margin: 0 auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 1em;
  background: #1c1c21;
  text-decorarion: none;
  list-style-type: none;
  cursor: pointer;
`

const HeadWrap = styled.div`
  border-left: solid 4px #ffffff;
  padding-left: 6px;
`

const Word = styled.span`
  display: block;
  color: #ffffff;
  font-weight: 800;
  font-size: ${moduler(-2)};
`

const URLWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
`

const URLWord = styled.span`
  display: block;
  color: #ffffff99;
  font-weight: 600;
  font-size: ${moduler(-2)};
`

export default BlancCommonLink

type BlancCommonTextProps = BlancElement & {
  data: {
    title: BlancTextElementProps
    url: BlancTextElementProps
  }
}
