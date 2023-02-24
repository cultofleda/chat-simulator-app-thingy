import * as React from 'react'

import MessageInput from '../MessageInput'
import Messages from '../Messages'
import RoomsTabBar from '../RoomsTabBar'

import { Main } from './styles'

const MainChat: React.FC = () => (
  <Main>
    <RoomsTabBar />
    <Messages />
    <MessageInput />
  </Main>
)

export default MainChat
