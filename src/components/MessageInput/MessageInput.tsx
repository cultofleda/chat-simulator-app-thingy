import * as React from 'react'
import { RoomsStore } from '../../store/RoomsStore/RoomsStore'

import { InputContainer, Input } from './styles'

const MessageInput: React.FC = () => {
  const roomsStore = React.useContext(RoomsStore)

  const { state, dispatch } = roomsStore
  const { activeRoomInputs, activeRoomId } = state

  const formRef = React.useRef<HTMLDivElement>(null)

  const sendMessage = () => {
    const message = activeRoomInputs[activeRoomId].trim()

    if (!message) {
      return
    }

    if (!window.serverInterface) {
      return
    }

    if (activeRoomId === 'public') {
      window.serverInterface.sendMessage(message)
    } else {
      window.serverInterface.sendPrivateMessage(activeRoomId.replace('private-', ''), message)
    }

    dispatch({ type: 'SET_ROOM_INPUT', payload: { activeRoomId, message: '' } })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target
    dispatch({ type: 'SET_ROOM_INPUT', payload: { activeRoomId, message: target.value } })
  }

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.defaultPrevented || event.key !== 'Enter') {
      return
    }

    sendMessage()
  }

  return (
    <InputContainer ref={formRef}>
      <Input
        autoFocus
        onChange={handleChange}
        onKeyUp={onKeyUp}
        placeholder={
          activeRoomId === 'public'
            ? 'Nachricht eingeben...'
            : `Nachricht an ${activeRoomId.replace('private-', '')} verfassen...`
        }
        tabIndex={-1}
        type="text"
        value={activeRoomInputs[activeRoomId]}
      />
    </InputContainer>
  )
}

export default MessageInput
