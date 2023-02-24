import * as React from 'react'
import { hot } from 'react-hot-loader/root'

import MessagesStoreProvider from '../store/MessagesStore/MessagesStore'
import UserStoreProvider from '../store/UserStore/UserStore'
import RoomsStoreProvider from '../store/RoomsStore/RoomsStore'

import UsersList from '../components/UsersList'
import MainChat from '../components/MainChat'

const App = () => {
  return (
    <MessagesStoreProvider>
      <UserStoreProvider>
        <RoomsStoreProvider>
          <MainChat />
          <UsersList />
        </RoomsStoreProvider>
      </UserStoreProvider>
    </MessagesStoreProvider>
  )
}

export default hot(App)
