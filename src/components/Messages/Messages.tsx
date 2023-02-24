import * as React from 'react'

import { MessagesStore, ChatInterfaceMessage } from '../../store/MessagesStore/MessagesStore'
import { RoomsStore } from '../../store/RoomsStore/RoomsStore'
import { User, UserStore } from '../../store/UserStore/UserStore'

import Message from '../../components/Message'

import { Container, List, ListInner } from './styles'

const Messages: React.FC = () => {
  /**
   * Setup a 'middleware' state for incoming messages, due to no state being properly accessible
   * inside the `onMessage` callback, therefore requiring additional handling
   */
  const [messageMiddleware, setMessageMiddleware] = React.useState<ChatInterfaceMessage>()
  const [autoScrollEnabled, setAutoScrollEnabled] = React.useState<boolean>(true)

  const messagesStore = React.useContext(MessagesStore)
  const roomsStore = React.useContext(RoomsStore)
  const userStore = React.useContext(UserStore)

  const { messages } = messagesStore.state
  const { users } = userStore.state

  const { activeRoomId } = roomsStore.state

  const scrollContainer = React.useRef<HTMLDivElement>(null)

  const date = new Date()

  const isUserActive = (username: string) => {
    const availableUsers = users.map((user: User) => user.username)
    return availableUsers.includes(username)
  }

  const onMessage = (username: string, message: string) => {
    const payload: ChatInterfaceMessage = {
      message,
      type: 'public',
      username,
      timestamp: {
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
      },
    }

    setMessageMiddleware(payload)
  }

  const onPrivateMessage = (username: string, recipient: string, message: string) => {
    const payload: ChatInterfaceMessage = {
      message,
      recipient,
      type: 'private',
      username,
      timestamp: {
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
      },
    }

    setMessageMiddleware(payload)
  }

  const shortMessageList = (collection = messages, maxMessages = 50): ChatInterfaceMessage[] => {
    if (collection.length <= maxMessages) {
      return collection
    }

    return collection.slice(Math.max(collection.length - maxMessages, 1))
  }

  const filterMessagesByRoom = (): ChatInterfaceMessage[] => {
    if (activeRoomId === 'public') {
      return shortMessageList()
    }

    const username = activeRoomId.replace('private-', '')

    const filteredMessages = messages.filter((message: ChatInterfaceMessage) => {
      return (
        (message.username === username || message.username === 'Myself') &&
        message.type === 'private' &&
        (message.recipient === username || message.recipient === 'Myself')
      )
    })

    return shortMessageList(filteredMessages)
  }

  const scrollDownList = () => {
    if (scrollContainer.current && autoScrollEnabled) {
      scrollContainer.current.scrollTop = scrollContainer.current.scrollHeight
    }
  }

  const onChatListScroll = (event: React.UIEvent<HTMLElement>) => {
    const target = event.target as HTMLElement
    setAutoScrollEnabled(target.scrollHeight - target.scrollTop === target.clientHeight)
  }

  React.useEffect(() => {
    if (messageMiddleware) {
      if (isUserActive(messageMiddleware.username) || messageMiddleware.username === 'Myself') {
        messagesStore.dispatch({ type: 'PUSH_MESSAGE', payload: messageMiddleware })
      }
    }
  }, [messageMiddleware])

  React.useEffect(() => {
    if (window.serverInterface) {
      window.serverInterface.registerObserver('onMessage', onMessage)
      window.serverInterface.registerObserver('onPrivateMessage', onPrivateMessage)
    }

    return () => {
      if (window.serverInterface) {
        window.serverInterface.removeObserver('onMessage', onMessage)
        window.serverInterface.removeObserver('onPrivateMessage', onPrivateMessage)
      }
    }
  }, [])

  React.useEffect(() => scrollDownList(), [messages, activeRoomId])

  return (
    <Container>
      <List>
        {messages.length ? (
          <ListInner ref={scrollContainer} onScroll={onChatListScroll}>
            {filterMessagesByRoom().map((message: ChatInterfaceMessage, index: number) => (
              <Message key={index} {...message} />
            ))}
          </ListInner>
        ) : null}
      </List>
    </Container>
  )
}

export default Messages
