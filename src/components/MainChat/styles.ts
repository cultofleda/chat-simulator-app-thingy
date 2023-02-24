import styled from 'styled-components'

export const Main = styled.main`
  height: 100%;
  position: relative;
  width: 100%;

  @media (min-width: 1024px) {
    width: ${(100 / 4) * 3}%;
  }
`
