import io from 'socket.io-client';
import {getToken} from '../auth';


const socket = io("http://localhost:3001",{
    transports: ['websocket'],
    query:{
        auth: `Bearer ${getToken()}`
    }
});


export default socket;