import * as React from 'react'

import { Room, RoomsStore } from '../../store/RoomsStore/RoomsStore'
import { TabBar, TabBarItem, CloseButton } from './styles'

const RoomsTabBar: React.FC = () => {
  const { state, dispatch } = React.useContext(RoomsStore)

  const setActiveRoom = (activeRoomId: string) => {
    dispatch({ type: 'SET_ACTIVE_ROOM', payload: { activeRoomId } })
  }

  const closeRoom = (id: string) => {
    dispatch({ type: 'CLOSE_ROOM', payload: { id } })
    dispatch({ type: 'SET_ACTIVE_ROOM', payload: { activeRoomId: 'public' } })
  }

  return (
    <TabBar>
      {state.rooms.map((room: Room, index: number) => (
        <TabBarItem className={room.id === state.activeRoomId ? 'active' : ''} key={index}>
          <span onClick={() => setActiveRoom(room.id)}>{room.label}</span>
          {room.type === 'private' && (
            <>
              <span> – Privat</span>
              <CloseButton onClick={() => closeRoom(room.id)}>
                <span>Schließen</span>
              </CloseButton>
            </>
          )}
        </TabBarItem>
      ))}
    </TabBar>
  )
}

export default RoomsTabBar
