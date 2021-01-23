// dependencies
import React, { useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPhoneSquareAlt,
  faVideo,
  faPaperclip,
  faUserPlus,
  faSearch,
  faQuestionCircle,
  faInbox
}
  from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'

// style
import './chatNavbar.css'
// callDisplay
import ChatNavbarCall from '../chatNavbarCall/ChatNavbarCall'
// socket-io
import socket from '../../services/websocket/socket'
// action
import callAction from '../../store/actions/call'

const ChatNavbar = ({ friend }) => {
  const call = useSelector(state => state.call)
  const dispatch = useDispatch()

  const changeNavbar = useCallback(() => {
    document.querySelector('.ChatNavbarCall').style.display = 'flex'
    document.querySelector('.chatNavbar').style.backgroundColor = 'rgb(18, 16, 19)'
    document.querySelector('.chatNavbar-main').style.border = 'none'
  }, [])

  const openCall = useCallback(() => {
    dispatch(callAction({ navbar: true }))
    changeNavbar()
  }, [friend, changeNavbar])

  const initCall = () => {
    socket.emit('startCall', friend._id)
    dispatch(callAction({ navbar: true, inCall: true }))
    changeNavbar()
  }

  const overFocus = event => {
    event.target.style.width = 200 + 'px'
  }

  const outFocus = event => {
    event.target.style.width = 120 + 'px'
  }

  useEffect(() => {
    if (call.navbar) {
      openCall()
    }
  }, [openCall, call.navbar])

  // jsx
  return (
        <div className="chatNavbar">
            <div className="chatNavbar-main">
                {friend !== undefined &&
                <>
                    <div className="chatNavbar-info">

                        <div className="chatNavbar-info--aroba">
                            @
                        </div>

                        <div className="chatNavbar-info--name">
                            {friend.name}
                        </div>

                        <div className="chatNavbar-info--status">
                            <div className={'chatNavbar-info--status--layer1'}>
                                <div className={`chatNavbar-info--status--layer2 ${friend.status}`}>
                                </div>
                            </div>
                            <div className="chatNavbar-info--status-legend">
                                {friend.status}
                            </div>
                        </div>

                    </div>

                    <div className="chatNavbar-setting">

                        <div className="chatNavbar-setting-icons">

                            <div
                                className="chatNavbar-setting-icon"
                                onClick={initCall}
                            >
                                <FontAwesomeIcon icon={faPhoneSquareAlt} />
                            </div>
                            <div className="chatNavbar-setting-icon">
                                <FontAwesomeIcon icon={faVideo} />
                            </div>
                            <div className="chatNavbar-setting-icon">
                                <FontAwesomeIcon icon={faPaperclip} />
                            </div>
                            <div className="chatNavbar-setting-icon">
                                <FontAwesomeIcon icon={faUserPlus}/>
                            </div>

                        </div>

                        <div className="chatNavbar-setting-search">
                            <input placeholder="Search"
                                    className="chatNavbar-setting-search-input"
                                    onFocus={overFocus}
                                    onBlur={outFocus}
                            />
                            <FontAwesomeIcon icon={faSearch} />
                        </div>

                        <div className="chatNavbar-setting-help">
                            <div className="chatNavbar-setting-icon">
                                <FontAwesomeIcon icon={faInbox} />
                            </div>
                            <div className="chatNavbar-setting-icon">
                                <FontAwesomeIcon icon={faQuestionCircle} />
                            </div>
                        </div>

                    </div>
                </>
                }
            </div>
            <ChatNavbarCall call={call}/>
        </div>
  )
}

export default ChatNavbar
