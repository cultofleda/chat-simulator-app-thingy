import * as React from 'react'

import { ChatInterfaceMessage, MessagesStore } from '../../store/MessagesStore/MessagesStore'
import { RoomsStore } from '../../store/RoomsStore/RoomsStore'
import { User } from '../../store/UserStore/UserStore'

import Badge from '../Badge'

import { ListItem } from './styles'

const UsersListItem: React.FC<User> = ({ username }) => {
  const messagesStore = React.useContext(MessagesStore)
  const roomsStore = React.useContext(RoomsStore)

  const { messages } = messagesStore.state

  const userMessages = messages.filter(
    (message: ChatInterfaceMessage) => message.type === 'public' && message.username === username
  ).length

  const openRoom = () => {
    const { state, dispatch } = roomsStore

    dispatch({
      type: 'OPEN_ROOM',
      payload: {
        type: 'private',
        id: `private-${username}`,
        label: username,
      },
    })

    if (state.activeRoomId !== `private-${username}`) {
      dispatch({
        type: 'SET_ACTIVE_ROOM',
        payload: {
          activeRoomId: `private-${username}`,
        },
      })
    }
  }

  return (
    <ListItem onClick={openRoom}>
      {username} <Badge color="secondary" label={userMessages.toString()} />
    </ListItem>
  )
}

export default UsersListItem
