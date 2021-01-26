// dependencies
import React from 'react'
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
// react redux
import { useDispatch } from 'react-redux'
// style
import './chatNavbar.css'
// components
import ChatNavbarCall from '../chatNavbarCall/ChatNavbarCall'
// action
import callAction from '../../store/actions/call'

const ChatNavbar = ({ friend }) => {
  const dispatch = useDispatch()

  const initCall = async () => {
    dispatch(callAction({
      startCall: true,
      friend: `${friend.name + '' + friend.code}`,
      navbar: true,
      inCall: true
    }))
  }

  const overFocus = event => {
    event.target.style.width = 200 + 'px'
  }

  const outFocus = event => {
    event.target.style.width = 120 + 'px'
  }

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
            <ChatNavbarCall/>
        </div>
  )
}

export default ChatNavbar
