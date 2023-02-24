import styled from 'styled-components'

export const Container = styled.div`
  background-color: var(--chat-background);
  display: flex;
  flex-direction: column;
  height: calc(100% - 64px);
  padding-top: 4rem;
  position: relative;
  z-index: 1;
`

export const List = styled.div`
  position: relative;
  z-index: 1;
  flex: 1 1 0;
  order: 1;
`

export const ListInner = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 100;
`
