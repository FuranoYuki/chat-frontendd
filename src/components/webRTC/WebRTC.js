import React, { useEffect, useState, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import callAction from '../../store/actions/call'
import socket from '../../services/websocket/socket'
import CallModal from '../callModal/CallModal'

const WebRTC = ({ user, stream, microPhoneIconChange }) => {
  const dispatch = useDispatch()
  const call = useSelector(state => state.call)
  const [rtcPeer, setRtcPeer] = useState(false)
  const [doAnswer, setDoAnswer] = useState(false)
  const [doOffer, setDoOffer] = useState(false)
  const [mediaStream, setMedia] = useState(false)

  const getUserMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true } })
      setMedia(stream)
      dispatch(callAction({ mute: true }))
      return stream
    } catch (error) {
      const stream = new MediaStream()
      dispatch(callAction({ mute: false }))
      setMedia(stream)
      return stream
    }
  }

  const createPeer = () => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
      ]
    })
    setRtcPeer(peerConnection)
  }

  // const muteConfig = (able, microEvent, microIcon, peer) => {
  //   rtcPeer.getSenders()[0].track.enabled = able
  //   microPhoneIconChange(microEvent)
  //   changeMute(microIcon)
  // }

  const addTrack = (peerConnection, stream) => {
    stream.getTracks().forEach(track => {
      peerConnection.addTrack(track, stream)
    })
    return peerConnection
  }

  const onTrack = (event) => {
    document.getElementById('localVideo').muted = false
    document.getElementById('localVideo').autoplay = true
    document.getElementById('localVideo').srcObject = event.streams[0]
  }

  useEffect(() => {
    // if (rtcPeer && stream && mute) {
    //   muteConfig(false, false, false, rtcPeer)
    // }
    // if (rtcPeer && stream && !mute) {
    //   if (rtcPeer.getSenders()[0].track) {
    //     muteConfig(true, false, true, rtcPeer)
    //   } else {
    //     console.log('need authorization again')
    //   }
    // }
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
      dispatch(callAction({
        modal: true,
        navbar: true,
        friendInCall: true,
        friend: data.from,
        friendId: data.id
      }))
    })
  }, [])

  const finshCall = (peer) => {
    const senders = peer.getSenders()
    senders.forEach(sender => {
      sender.track.stop()
      peer.removeTrack(sender)
    })
    peer.onicecandidate = null
    peer.restartIce()
    setRtcPeer(false)
    setMedia(false)
    dispatch(callAction({
      navbar: false,
      inCall: false,
      friend: false,
      friendInCall: false,
      modal: false,
      friendId: false,
      to: false,
      mute: false,
      closeCall: false
    }))
  }

  useEffect(() => {
    socket.on('finishCall', () => {
      if (rtcPeer) {
        finshCall(rtcPeer)
      }
    })
  }, [rtcPeer])

  useEffect(() => {
    if (rtcPeer && !call.inCall) {
      finshCall(rtcPeer)
    }
  }, [call.inCall, rtcPeer])

  useEffect(() => {
    if (call.closeCall) {
      socket.emit('finishCall', call.to)
    }
  }, [call.closeCall])

  useEffect(() => {
    const offerHandler = async () => {
      addTrack(rtcPeer, mediaStream)
      rtcPeer.ontrack = onTrack
      rtcPeer.onicecandidate = function (event) {
        if (event.candidate) {
          socket.emit('webrtc_ice_candidate', {
            to: call.friend,
            label: event.candidate.sdpMLineIndex,
            candidate: event.candidate.candidate
          })
        }
      }

      // set local description and create offer
      const offer = await rtcPeer.createOffer()
      await rtcPeer.setLocalDescription(offer)

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
        rtcPeer.addIceCandidate(cand)
      })

      // receive answer and set remote description
      socket.once('callAnswer', signal => {
        rtcPeer.setRemoteDescription(new RTCSessionDescription(signal))
        dispatch(callAction({ friendInCall: true }))
      })
      setDoOffer(false)
    }

    if (doOffer && rtcPeer && mediaStream) {
      offerHandler()
    }
  }, [doOffer, rtcPeer, mediaStream])

  useEffect(() => {
    const answerHandler = async () => {
      addTrack(rtcPeer, mediaStream)
      rtcPeer.ontrack = onTrack
      rtcPeer.onicecandidate = function (event) {
        if (event.candidate) {
          socket.emit('webrtc_ice_candidate', {
            to: doAnswer.from,
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
        rtcPeer.addIceCandidate(cand)
      })

      // set remote and local description and create answer
      rtcPeer.setRemoteDescription(new RTCSessionDescription(doAnswer.signal))
      const sessionDescription = await rtcPeer.createAnswer()
      rtcPeer.setLocalDescription(sessionDescription)

      // send answer
      await socket.emit('callAnswer', { signal: sessionDescription, to: doAnswer.from })
    }

    if (doAnswer && rtcPeer && mediaStream) {
      answerHandler()
    }
  }, [doAnswer, rtcPeer, mediaStream])

  useEffect(() => {
    socket.on('acceptedCall', async () => {
      if (call.friend) {
        await getUserMedia()
        createPeer()
        setDoOffer(true)
        setDoOffer(false)
      }
    })
  }, [call.friend])

  useEffect(() => {
    socket.on('recusedCall', () => {
      dispatch(callAction({ navbar: false, inCall: false }))
    })
  }, [])

  useEffect(() => {
    socket.once('callOffer', async (offer) => {
      try {
        await getUserMedia()
        createPeer()
        setDoAnswer(offer)
        setDoAnswer(false)
      } catch (error) {
        console.log(error)
      }
    })
  }, [rtcPeer])

  return (
    <>
      <video
          id="localVideo"
          muted
          playsInline
          controls={false}
          style={{ width: '0', height: '0' }}
      />
      <CallModal/>
    </>
  )
}

export default memo(WebRTC)
