import styled from 'styled-components'

export const TabBar = styled.ul`
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  left: 0;
  padding: 1.15rem 1rem 0 1rem;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 3;
  list-style: none;
  margin: 0;
  display: block;

  &::after {
    clear: both;
    content: '';
    display: table;
  }
`

export const TabBarItem = styled.li`
  background-color: #fff;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  border: 1px solid #ddd;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  float: left;
  margin-top: -1px;
  padding: 0.5rem 1.5rem;
  position: relative;
  top: 1px;
  transition: background 250ms ease, border-bottom-color 250ms ease;

  &.active {
    background-color: var(--chat-background);
    border-bottom-color: var(--message-primary);
  }

  & + li {
    margin-left: 0.25rem;
  }

  & > span {
    & + span {
      margin-left: 0.25rem;
    }
  }
`

export const CloseButton = styled.button`
  align-items: center;
  appearance: none;
  background-color: transparent;
  background-image: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='times-circle' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='svg-inline--fa fa-times-circle fa-w-16'%3E%3Cpath fill='%23142121' d='M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z' class=''%3E%3C/path%3E%3C/svg%3E");
  background-size: contain;
  border: 0;
  height: 1rem;
  line-height: 1;
  margin-left: 0.5rem;
  width: 1rem;

  & > span {
    display: none;
  }

  &:focus {
    outline: none;
  }
`
