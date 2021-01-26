import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import callAction from '../../store/actions/call'
import socket from '../../services/websocket/socket'
import CallModal from '../callModal/CallModal'
import Peer from 'simple-peer'
import api from '../../services/http/api'

const WebRTC = () => {
  const call = useSelector(state => state.call)
  const dispatch = useDispatch()
  const [user, setUser] = useState('')

  useEffect(() => {
    api.post('/user/getUserBasicInfo')
      .then(res => setUser(res.data))
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    if (call.startCall) {
      // start()
      socket.emit('startCall', {
        from: `${user.name + '' + user.code}`,
        to: call.friend,
        id: user._id
      })
      dispatch(callAction({ startCall: false, navbar: true, inCall: true }))
    }
  }, [call.startCall])

  useEffect(() => {
    socket.on('pendingCall', data => {
      dispatch(callAction({ modal: true, navbar: true, friendInCall: true, friend: data.from, friendId: data.id }))
    })
  }, [])

  useEffect(() => {
    socket.on('acceptedCall', async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const peer = new Peer({
        initiator: true,
        trickle: false,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' }
          ]
        },
        stream: stream
      })

      peer.on('signal', data => {
        socket.emit('callOffer', {
          to: call.friend,
          signal: data,
          from: `${user.name + '' + user.code}`,
          id: user._id
        })
      })

      peer.on('stream', stream => {
        document.getElementById('localVideo').srcObject = stream
      })

      socket.on('callAnswer', signal => {
        peer.signal(signal)
        dispatch(callAction({ friendInCall: true }))
      })

      socket.on('finishCall', () => {
        peer.destroy()
        stream.getTracks()[0].stop()
        dispatch(callAction({ navbar: false, inCall: false }))
      })
    })
  }, [call.friend])

  useEffect(() => {
    socket.on('recusedCall', () => {
      dispatch(callAction({ navbar: false, inCall: false }))
    })
  }, [])

  useEffect(() => {
    socket.on('callOffer', async offer => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const peer = new Peer({
          initiator: false,
          trickle: false,
          stream: stream
        })

        peer.on('signal', data => {
          socket.emit('callAnswer', { signal: data, to: offer.from })
          dispatch(callAction({ modal: false, inCall: true }))
        })

        peer.on('stream', stream => {
          document.getElementById('localVideo').srcObject = stream
        })

        peer.signal(offer.signal)
      } catch (error) {
        socket.emit('finishCall', offer.from)
      }
    })
  }, [])

  return (
    <>
      <video
          id="localVideo"
          autoPlay
          playsInline
          controls={false}
          style={{ width: '0', height: '0' }}
      />
      <CallModal/>
    </>
  )
}

export default WebRTC
