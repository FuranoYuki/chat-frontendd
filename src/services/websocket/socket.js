import io from 'socket.io-client'
import { getToken } from '../auth'

const socket = io(process.env.REACT_APP_API_URL, {
  transports: ['websocket'],
  query: {
    auth: `Bearer ${getToken()}`
  }
})

export default socket
