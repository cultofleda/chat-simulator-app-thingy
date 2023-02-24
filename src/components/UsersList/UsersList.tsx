import * as React from 'react'
import { useMedia } from 'react-use'

import { User, UserStore } from '../../store/UserStore/UserStore'

import { UsersListContainer, UsersListHeading, UsersListItems, ToggleUsersButton } from './styles'

import UsersListItem from '../UsersListItem'
import Badge from '../Badge'

const UsersList: React.FC = () => {
  const userStore = React.useContext(UserStore)
  const [visible, setVisible] = React.useState(false)
  const listRef = React.useRef<HTMLUListElement>(null)

  const isWide = useMedia('(min-width: 1024px)')

  const date = new Date()

  const onUserJoined = (username: string) =>
    userStore.dispatch({ type: 'ADD_USER', payload: { username, joinedAt: date } })

  const onUserLeft = (username: string) =>
    userStore.dispatch({ type: 'REMOVE_USER', payload: { username, joinedAt: date } })

  React.useEffect(() => {
    if (window.serverInterface) {
      window.serverInterface.registerObserver('onUserJoined', onUserJoined)
      window.serverInterface.registerObserver('onUserLeft', onUserLeft)
    }

    return () => {
      if (window.serverInterface) {
        window.serverInterface.removeObserver('onUserJoined', onUserJoined)
        window.serverInterface.removeObserver('onUserLeft', onUserLeft)
      }
    }
  }, [])

  React.useEffect(() => {
    setVisible(isWide)
  }, [isWide])

  React.useEffect(() => {
    if (!visible) {
      if (listRef.current) {
        listRef.current.scrollTop = 0
      }
    }
  }, [visible])

  const sortedUsers = userStore.state.users.sort((a: User, b: User) => a.joinedAt - b.joinedAt)

  return (
    <UsersListContainer className={visible ? 'visible' : ''}>
      {!isWide && (
        <ToggleUsersButton className={visible ? 'active' : ''} onClick={() => setVisible(!visible)}>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="user-friends"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
            className="svg-inline--fa fa-user-friends fa-w-20"
          >
            <path
              fill="currentColor"
              d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z"
              className=""
            ></path>
          </svg>
          <span>{visible ? 'Verstecken' : 'Zeigen'}</span>
        </ToggleUsersButton>
      )}
      <UsersListHeading>
        {sortedUsers.length ? (
          <>
            <Badge margin="right" label={sortedUsers.length.toString()} /> Aktive Nutzer
          </>
        ) : (
          'Noch keine Nutzer beigetreten'
        )}
      </UsersListHeading>
      {sortedUsers.length ? (
        <UsersListItems ref={listRef}>
          {sortedUsers.map((user: User, index: number) => (
            <UsersListItem {...user} key={index} />
          ))}
        </UsersListItems>
      ) : null}
    </UsersListContainer>
  )
}

export default UsersList
