import * as React from 'react'

import createCtx from '../../helpers/createCtx'

export type Room = {
  type: 'public' | 'private'
  id: string
  label: string
}

export type RoomInput = { [id: string]: string }

export type RoomsStoreState = {
  rooms: Room[]
  activeRoomId: string
  activeRoomInputs: RoomInput
}

type RoomsStoreAction =
  | { type: 'OPEN_ROOM'; payload: Room }
  | { type: 'CLOSE_ROOM'; payload: { id: string } }
  | { type: 'SET_ACTIVE_ROOM'; payload: { activeRoomId: string } }
  | { type: 'SET_ROOM_INPUT'; payload: { activeRoomId: string; message: string } }

const initialState: RoomsStoreState = {
  rooms: [{ type: 'public', id: 'public', label: 'Öffentlich' }],
  activeRoomId: 'public',
  activeRoomInputs: { public: '' },
}

const roomExists = (collection: Room[], roomId: string): boolean =>
  collection.some((room: Room) => room.id === roomId)

const reducer = (state: RoomsStoreState, action: RoomsStoreAction): RoomsStoreState => {
  switch (action.type) {
    case 'OPEN_ROOM': {
      if (roomExists(state.rooms, action.payload.id)) {
        return state
      }

      return {
        ...state,
        rooms: [...state.rooms, action.payload],
      }
    }
    case 'CLOSE_ROOM': {
      if (!roomExists(state.rooms, action.payload.id)) {
        return state
      }

      const filteredRooms = state.rooms.filter((room: Room) => room.id !== action.payload.id)

      return {
        ...state,
        rooms: filteredRooms,
      }
    }
    case 'SET_ACTIVE_ROOM': {
      return {
        ...state,
        activeRoomId: action.payload.activeRoomId,
      }
    }
    case 'SET_ROOM_INPUT': {
      return {
        ...state,
        activeRoomInputs: {
          ...state.activeRoomInputs,
          [action.payload.activeRoomId]: action.payload.message,
        },
      }
    }
    default: {
      throw new Error(`No reducer action supplied!`)
    }
  }
}

const [Context, Provider] = createCtx(reducer, initialState)
export const RoomsStore = Context

export const RoomsStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Provider>{children}</Provider>
)

export default RoomsStoreProvider
