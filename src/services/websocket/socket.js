import io from 'socket.io-client'
import { getToken } from '../auth'

const socket = io('https://chat-beckend.herokuapp.com', {
  transports: ['websocket'],
  query: {
    auth: `Bearer ${getToken()}`
  }
})

export default socket
