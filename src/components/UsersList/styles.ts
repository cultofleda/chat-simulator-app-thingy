import styled from 'styled-components'

export const UsersListContainer = styled.aside`
  background-color: var(--users-list-background);
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.125);
  height: 100%;
  margin: 0;
  padding: 0;
  position: fixed;
  right: 0;
  top: 0;
  transform: translateX(100%);
  transition: transform 250ms ease;
  width: calc(100% / 3);
  z-index: 3;

  @media (min-width: 1024px) {
    transform: translateX(0);
    transition: none;
    width: ${100 / 4}%;
  }

  &.visible {
    transform: translateX(0);
  }

  & > button {
    left: -1rem;
    position: absolute;
    top: 1rem;
    transform: translateX(-100%);
    z-index: 1;

    @media (min-width: 1024px) {
      display: none;
    }
  }
`

export const UsersListHeading = styled.p`
  align-items: center;
  background-color: var(--users-list-background);
  border-bottom: 1px solid #ddd;
  display: flex;
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
  min-height: 48px;
  padding: 1rem 1rem calc(1rem - 1px);
`

export const UsersListItems = styled.ul`
  background-color: #fafafa;
  list-style: none;
  margin: 0;
  padding: 0;
  height: calc(100% - 48px);
  overflow-y: scroll;

  & > li {
    font-size: 0.9rem;
    padding: 0.8rem 1rem;
  }
`

export const ToggleUsersButton = styled.button`
  align-items: center;
  appearance: none;
  background-color: #fff;
  border-radius: 0.25rem;
  border: 1px solid #ddd;
  color: #444;
  cursor: pointer;
  display: inline-flex;
  height: 2.5rem;
  justify-content: center;
  transition: border-color 250ms ease, background-color 250ms ease, box-shadow 250ms ease;
  width: 2.5rem;

  &.active {
    background-color: var(--message-primary-light);
    color: #fff;
    outline: none;
    border-color: var(--message-primary-light);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--message-primary-dark);
  }

  & > svg {
    display: block;
    max-width: 1.5rem;
    transition: fill 250ms ease;
    width: 100%;
  }

  & > span {
    display: none;
  }
`
