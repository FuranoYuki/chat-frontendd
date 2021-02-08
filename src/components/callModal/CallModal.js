import React, { useEffect, useRef } from 'react'
// fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneSquareAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
// style
import styles from './CallModal.module.css'
// router
import { useHistory } from 'react-router-dom'
// redux
import { useSelector, useDispatch } from 'react-redux'
// action
import callAction from '../../store/actions/call'
import socket from '../../services/websocket/socket'

const CallModal = () => {
  const history = useHistory()
  const callModal = useRef(null)
  const dispatch = useDispatch()
  const callModalText = useRef(null)
  const call = useSelector(state => state.call)

  const recuseCall = (to) => {
    socket.emit('recusedCall', to)
    dispatch(callAction({ navbar: false, friendInCall: false, modal: false, friend: false }))
  }

  const acceptCall = (to, id) => {
    socket.emit('acceptedCall', to)
    dispatch(callAction({ modal: false, inCall: true }))
    history.push(`/chat/${id}`)

    callModalText.current.innerHTML = 'please allow us to use your microphone'
  }

  useEffect(() => {
    if (call.modal) {
      callModal.current.style.display = 'flex'
    } else {
      callModalText.current.innerHTML = 'Incoming call ...'
      callModal.current.style.display = 'none'
    }
  }, [call.modal])

  return (
    <div ref={callModal} className={styles.callmodal}>
      <div className={styles.callmodal_main}>
        <img
          className={styles.main_img}
          src="https://discord.com/assets/6debd47ed13483642cf09e832ed0bc1b.png"
          alt="perfil"
        />
        <div className={styles.main_text}>
          <div className={styles.text_header}>
            Antonio
          </div>
          <div ref={callModalText} className={styles.text_body}>
            Incoming call ...
          </div>
        </div>
        <div className={styles.main_buttons}>
          <div
            className={`${styles.main_buttons} ${styles.decline}`}
            onClick={() => recuseCall(call.friend)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <div
            onClick={() => acceptCall(call.friend, call.friendId)}
            className={`${styles.main_buttons} ${styles.accept}`}
          >
            <FontAwesomeIcon icon={faPhoneSquareAlt} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CallModal
