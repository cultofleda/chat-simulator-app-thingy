import * as React from 'react'

import { ChatInterfaceMessage } from '../../store/MessagesStore/MessagesStore'
import { Room, RoomsStore } from '../../store/RoomsStore/RoomsStore'
import { User, UserStore } from '../../store/UserStore/UserStore'

import { Wrapper, Inner, UserName, MentionedUser } from './styles'

const Message: React.FC<ChatInterfaceMessage> = (props) => {
  const { username, message, type, timestamp, recipient } = props

  const userStore = React.useContext(UserStore)
  const roomsStore = React.useContext(RoomsStore)

  const isPrivateRoom = roomsStore.state.activeRoomId !== 'public'

  const userRooms = roomsStore.state.rooms
    .filter((room: Room) => room.id !== 'public')
    .map((room: Room) => room.label)

  const openRoom = (name = username): void => {
    if (name === 'Myself') {
      return
    }

    roomsStore.dispatch({
      type: 'OPEN_ROOM',
      payload: {
        type: 'private',
        id: `private-${name}`,
        label: name,
      },
    })

    if (roomsStore.state.activeRoomId !== `private-${name}`) {
      roomsStore.dispatch({
        type: 'SET_ACTIVE_ROOM',
        payload: {
          activeRoomId: `private-${name}`,
        },
      })
    }
  }

  const renderYoutubeVideo = (): React.ReactNode => {
    const match = message.match(/(www.youtube.com)/)

    if (!match || !match.length) {
      return null
    }

    const url = new URL(message)
    const youtubeVideoId = url.search.replace('?v=', '')

    return (
      <div className="youtube-embed">
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${youtubeVideoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  const renderMentions = (): React.ReactNode => {
    const activeUserNames = userStore.state.users.map((user: User) => user.username)
    const split: React.ReactNodeArray = message.split(' ')

    activeUserNames.map((username: string) => {
      const index = split.indexOf(username)

      if (index > -1) {
        split[index] = (
          <MentionedUser onClick={() => openRoom(username)}>
            <span>@</span>
            {username}
          </MentionedUser>
        )
      }
    })

    if (renderYoutubeVideo()) {
      return renderYoutubeVideo()
    }

    return (
      <span className="message">
        {split.map((part, index) => (
          <React.Fragment key={index}>{part} </React.Fragment>
        ))}
      </span>
    )
  }

  if (
    (userRooms.includes(username) || (recipient && userRooms.includes(recipient))) &&
    type === 'private' &&
    !isPrivateRoom
  ) {
    return null
  }

  return (
    <Wrapper
      className={`${username === 'Myself' ? 'ours' : 'theirs'} ${isPrivateRoom ? '' : type}`}
    >
      <Inner ours={username === 'Myself'} tabIndex={-1}>
        <UserName>
          <strong className="username" onClick={() => openRoom()}>
            {username}
          </strong>{' '}
          sagt
          {type === 'private' && !isPrivateRoom ? <em> privat</em> : ''}
        </UserName>
        {renderMentions()}
        <time>{timestamp.time}</time>
      </Inner>
    </Wrapper>
  )
}

export default Message
