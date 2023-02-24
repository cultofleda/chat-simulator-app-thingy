import * as React from 'react'

import createCtx from '../../helpers/createCtx'

export type ChatInterfaceMessage = {
  username: string
  message: string
  type: 'private' | 'public'
  recipient?: string
  timestamp: {
    date: string
    time: string
  }
}

export type MessagesStoreState = {
  messages: ChatInterfaceMessage[]
}

type MessagesStoreAction = { type: 'PUSH_MESSAGE'; payload: ChatInterfaceMessage }

const initialState: MessagesStoreState = { messages: [] }

const reducer = (state: MessagesStoreState, action: MessagesStoreAction): MessagesStoreState => {
  const date = new Date()

  switch (action.type) {
    case 'PUSH_MESSAGE': {
      const payload = {
        ...action.payload,
        timestamp: {
          date: date.toLocaleDateString(),
          time: date.toLocaleTimeString(),
        },
      }

      return {
        messages: [...state.messages, payload],
      }
    }
    default: {
      throw new Error(`No reducer action supplied!`)
    }
  }
}

const [Context, Provider] = createCtx(reducer, initialState)
export const MessagesStore = Context

export const MessagesStoreProvider: React.FC<{ children: React.ReactNode }> = (props) => (
  <Provider>{props.children}</Provider>
)

export default MessagesStoreProvider
