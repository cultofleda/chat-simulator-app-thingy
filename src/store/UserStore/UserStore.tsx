import * as React from 'react'

import createCtx from '../../helpers/createCtx'

export type User = {
  username: string
  joinedAt: number
}

export type UserStoreState = {
  users: User[]
}

type UserStoreAction =
  | { type: 'ADD_USER'; payload: { username: string; joinedAt: Date } }
  | { type: 'REMOVE_USER'; payload: { username: string; joinedAt: Date } }

const initialState: UserStoreState = { users: [] }

const userExists = (collection: User[], username: string): boolean =>
  collection.some((item: User) => item.username === username)

const reducer = (state: UserStoreState, action: UserStoreAction): UserStoreState => {
  const { username } = action.payload
  const { users } = state

  const joinedAt = Date.now()

  switch (action.type) {
    case 'ADD_USER': {
      if (userExists(users, username)) {
        return state
      }

      return { users: [...users, { username, joinedAt }] }
    }
    case 'REMOVE_USER': {
      if (!userExists(users, username)) {
        return state
      }

      const filteredUsers = users.filter((item) => item.username !== username)

      return { users: filteredUsers }
    }
    default: {
      throw new Error(`No reducer action supplied!`)
    }
  }
}

const [Context, Provider] = createCtx(reducer, initialState)
export const UserStore = Context

export const UserStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Provider>{children}</Provider>
)

export default UserStoreProvider
