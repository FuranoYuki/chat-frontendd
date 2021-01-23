import React, { useEffect } from 'react'
// fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneSquareAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
// style
import './CallModal.css'
// router
import { useParams, useHistory } from 'react-router-dom'
// redux
import { useSelector, useDispatch } from 'react-redux'
// action
import call from '../../store/actions/call'

const CallModal = ({ friend }) => {
  const modal = useSelector(state => state.call.modal)
  const dispatch = useDispatch()
  const { friend: url } = useParams()
  const history = useHistory()

  const closeModal = () => {
    dispatch(call({ modal: false }))
  }

  const acceptCall = () => {
    dispatch(call({ inCall: true, modal: false }))
    if (friend._id !== url) {
      history.push(`chat/${friend._id}`)
    }
  }

  useEffect(() => {
    if (modal) {
      document.querySelector('.CallModal').style.display = 'flex'
    } else {
      document.querySelector('.CallModal').style.display = 'none'
    }
  }, [modal])

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
                        {friend.name}
                    </div>
                    <div className="callmodal-main-text-body">
                        Incoming call ...
                    </div>
                </div>
                <div className="callmodal-main-buttons">
                    <div
                        className="callmodal-main-button decline"
                        onClick={closeModal}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                    <div
                        to={`/chat/${friend._id}/${true}`}
                        onClick={acceptCall}
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
