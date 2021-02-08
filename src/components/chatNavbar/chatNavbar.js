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
import styles from './chatNavbar.module.css'
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

  return (
    <div className={`${styles.chatnavbar} chatNavbar`}>
        <div className={`${styles.chatnavbar_main} chatNavbar-main`}>
            {friend !== undefined &&
            <>
                <div className={styles.chatnavbar_info}>

                    <div className={styles.info_aroba}>
                        @
                    </div>

                    <div className={styles.info_name}>
                        {friend.name}
                    </div>

                    <div className={styles.info_status}>
                        <div className={styles.status_layer1}>
                            <div className={`${styles.status_layer2} ${friend.status}`}>
                            </div>
                        </div>
                        <div className={styles.status_legend}>
                            {friend.status}
                        </div>
                    </div>

                </div>

                <div className={styles.chatnavbar_setting}>

                    <div className={styles.setting_icons}>

                        <div
                            className={styles.setting_icon}
                            onClick={initCall}
                        >
                            <FontAwesomeIcon icon={faPhoneSquareAlt} />
                        </div>
                        <div className={styles.setting_icon}>
                            <FontAwesomeIcon icon={faVideo} />
                        </div>
                        <div className={styles.setting_icon}>
                            <FontAwesomeIcon icon={faPaperclip} />
                        </div>
                        <div className={styles.setting_icon}>
                            <FontAwesomeIcon icon={faUserPlus}/>
                        </div>

                    </div>

                    <div className={styles.setting_search}>
                        <input
                            onBlur={outFocus}
                            onFocus={overFocus}
                            autoComplete="off"
                            placeholder="Search"
                            className={styles.search_input}
                        />
                        <FontAwesomeIcon icon={faSearch} />
                    </div>

                    <div className={styles.setting_help}>
                        <div className={styles.setting_icon}>
                            <FontAwesomeIcon icon={faInbox} />
                        </div>
                        <div className={styles.setting_icon}>
                            <FontAwesomeIcon icon={faQuestionCircle} />
                        </div>
                    </div>

                </div>
            </>
            }
        </div>
        <ChatNavbarCall name={friend.name} code={friend.code} />
    </div>
  )
}

export default ChatNavbar
