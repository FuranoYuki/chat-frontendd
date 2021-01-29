import React, { useEffect, useState, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import callAction from '../../store/actions/call'
import socket from '../../services/websocket/socket'
import CallModal from '../callModal/CallModal'

const WebRTC = ({ user, mute, changeMute, stream, microPhoneIconChange }) => {
  const dispatch = useDispatch()
  const [rtcPeer, setRtcPeer] = useState('')
  const call = useSelector(state => state.call)

  const getUserMedia = async () => {
    try {
      changeMute(true)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true } })
      return stream
    } catch (error) {
      const stream = new MediaStream()
      changeMute(false)
      return stream
    }
  }

  const muteConfig = (able, microEvent, microIcon, peer) => {
    rtcPeer.getSenders()[0].track.enabled = able
    microPhoneIconChange(microEvent)
    changeMute(microIcon)
  }

  const addTrack = (peerConnection, stream) => {
    stream.getTracks().forEach(track => {
      peerConnection.addTrack(track, stream)
    })
    return peerConnection
  }

  const onTrack = (event) => {
    document.getElementById('localVideo').srcObject = event.streams[0]
  }

  useEffect(() => {
    if (rtcPeer && stream && mute) {
      muteConfig(false, false, false, rtcPeer)
    }
    if (rtcPeer && stream && !mute) {
      if (rtcPeer.getSenders()[0].track) {
        muteConfig(true, false, true, rtcPeer)
      } else {
        console.log('need authorization again')
      }
    }
  }, [stream, rtcPeer])

  useEffect(() => {
    if (call.startCall) {
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
    socket.once('acceptedCall', async () => {
      if (call.friend) {
        const stream = await getUserMedia()
        const peerConnection = new RTCPeerConnection({
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' }
          ]
        })

        // RTC events and tracks
        addTrack(peerConnection, stream)
        peerConnection.ontrack = onTrack
        peerConnection.onicecandidate = function (event) {
          if (event.candidate) {
            socket.emit('webrtc_ice_candidate', {
              to: call.friend,
              label: event.candidate.sdpMLineIndex,
              candidate: event.candidate.candidate
            })
          }
        }

        // set local description and create offer
        const offer = await peerConnection.createOffer()
        await peerConnection.setLocalDescription(offer)

        // send offer
        socket.emit('callOffer', {
          to: call.friend,
          signal: offer,
          from: `${user.name + '' + user.code}`,
          id: user._id
        })
        dispatch(callAction({ friend: false }))

        socket.on('webrtc_ice_candidate', ({ label, candidate }) => {
          const cand = new RTCIceCandidate({
            sdpMLineIndex: label,
            candidate: candidate
          })
          peerConnection.addIceCandidate(cand)
        })

        // receive answer and set remote description
        socket.once('callAnswer', signal => {
          peerConnection.setRemoteDescription(new RTCSessionDescription(signal))
          dispatch(callAction({ friendInCall: true }))
        })

        setRtcPeer(peerConnection)
      }
    })
  }, [call.friend])

  useEffect(() => {
    socket.once('recusedCall', () => {
      dispatch(callAction({ navbar: false, inCall: false }))
    })
  }, [])

  useEffect(() => {
    socket.once('callOffer', async ({ signal, from }) => {
      try {
        const stream = await getUserMedia()
        const peerConnection = new RTCPeerConnection({
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' }
          ]
        })

        // RTC events and tracks
        addTrack(peerConnection, stream)
        peerConnection.ontrack = onTrack
        peerConnection.onicecandidate = function (event) {
          if (event.candidate) {
            socket.emit('webrtc_ice_candidate', {
              to: from,
              label: event.candidate.sdpMLineIndex,
              candidate: event.candidate.candidate
            })
          }
        }

        socket.on('webrtc_ice_candidate', ({ label, candidate }) => {
          const cand = new RTCIceCandidate({
            sdpMLineIndex: label,
            candidate: candidate
          })
          peerConnection.addIceCandidate(cand)
        })

        // set remote and local description and create answer
        peerConnection.setRemoteDescription(new RTCSessionDescription(signal))
        const sessionDescription = await peerConnection.createAnswer()
        peerConnection.setLocalDescription(sessionDescription)

        // send answer
        await socket.emit('callAnswer', { signal: sessionDescription, to: from })
        setRtcPeer(peerConnection)
      } catch (error) {
        console.log(error)
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

export default memo(WebRTC)
