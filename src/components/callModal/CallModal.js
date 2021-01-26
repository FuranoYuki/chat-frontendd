import React, { useEffect } from 'react'
// fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneSquareAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
// style
import './CallModal.css'
// router
import { useHistory } from 'react-router-dom'
// redux
import { useSelector, useDispatch } from 'react-redux'
// action
import callAction from '../../store/actions/call'
import socket from '../../services/websocket/socket'

const CallModal = ({ friendId }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const call = useSelector(state => state.call)

  const recuseCall = (to) => {
    socket.emit('recusedCall', to)
    dispatch(callAction({ navbar: false, friendInCall: false, modal: false, friend: false }))
  }

  const acceptCall = (to, id) => {
    socket.emit('acceptedCall', to)
    dispatch(callAction({ inCall: true }))
    history.push(`/chat/${id}`)

    document.querySelector('.callmodal-main-text-body')
      .innerHTML = 'please allow us to use your microphone'
    document.querySelector('.callmodal-main-buttons').style.display = 'none'
  }

  useEffect(() => {
    if (call.modal) {
      document.querySelector('.CallModal').style.display = 'flex'
    } else {
      document.querySelector('.callmodal-main-text-body').innerHTML = 'Incoming call ...'
      document.querySelector('.CallModal').style.display = 'none'
    }
  }, [call.modal])

  return (
        <div className="CallModal">
            <div className="callmodal-main">
                <img
                    className="callmodal-main-img"
                    src="https://discord.com/assets/6debd47ed13483642cf09e832ed0bc1b.png"
                    alt="perfil"
                />
                <div className="callmodal-main-text">
                    <div className="callmodal-main-text-header">
                        Antonio
                    </div>
                    <div className="callmodal-main-text-body">
                        Incoming call ...
                    </div>
                </div>
                <div className="callmodal-main-buttons">
                    <div
                        className="callmodal-main-button decline"
                        onClick={() => recuseCall(call.friend)}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                    <div
                        onClick={() => acceptCall(call.friend, call.friendId)}
                        className="callmodal-main-button accept"
                    >
                        <FontAwesomeIcon icon={faPhoneSquareAlt} />
                    </div>
                </div>
            </div>
        </div>
  )
}

export default CallModal
