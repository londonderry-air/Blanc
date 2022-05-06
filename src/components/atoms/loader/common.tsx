import styled from 'styled-components'

const _Loader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin-top: 1em;

  span {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #919191;
    animation-name: loading;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;

    &:nth-of-type(2) {
      animation-delay: 0.2s;
    }

    &:nth-of-type(3) {
      animation-delay: 0.4s;
    }
  }

  @keyframes loading {
    0% {
      transform: scale(1);
    }

    25% {
      transform: scale(1.2);
    }

    50% {
      transform: scale(1);
    }

    75% {
      transform: scale(0.8);
    }

    100% {
      transform: scale(1);
    }
  }
`

export const Loader = () => {
  return (
    <_Loader>
      <span></span>
      <span></span>
      <span></span>
    </_Loader>
  )
}
