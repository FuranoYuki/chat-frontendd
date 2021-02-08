import React, { useEffect, useRef } from 'react'
// styles
import styles from './ChatNavbarCall.module.css'
// fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMicrophone,
  faMicrophoneSlash,
  faPhoneSlash,
  faDesktop,
  faVideo,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons'
// redux
import { useSelector, useDispatch } from 'react-redux'
// action
import callAction from '../../store/actions/call'
// icon
import icon from '../../assets/discord.png'

const ChatNavbarCall = ({ name, code }) => {
  const dispatch = useDispatch()
  const navbarcall = useRef(null)
  const call = useSelector(state => state.call)

  const closeNavbar = () => {
    navbarcall.current.style.display = 'none'
    document.querySelector('.chatNavbar').style.backgroundColor = 'transparent'
    document.querySelector('.chatNavbar-main').style.borderBottom = '1px solid rgb(11, 10, 10)'
  }

  const openNavbar = () => {
    navbarcall.current.style.display = 'flex'
    document.querySelector('.chatNavbar').style.backgroundColor = 'rgb(18, 16, 19)'
    document.querySelector('.chatNavbar-main').style.border = 'none'
  }

  const closeCall = () => {
    dispatch(callAction({ inCall: false, closeCall: true, to: `${name + '' + code}`, navbar: false }))
  }

  useEffect(() => {
    call.navbar ? openNavbar() : closeNavbar()
  }, [call.navbar])

  return (
        <div className={styles.chatnavbarcall} ref={navbarcall}>
            <div className={styles.chatnavbarcall_users}>

                {call.friendInCall &&
                <div className={styles.chatnavbarcall_user}>
                    <img
                        className={styles.user_img}
                        src={icon}
                    />
                    <div className={styles.user_microphone}>
                        <FontAwesomeIcon icon={faMicrophone} />
                    </div>
                </div>
                }

                {call.inCall &&
                <div className={styles.chatnavbarcall_user}>
                    <img
                        className={styles.user_img}
                        src={icon}
                    />
                    <div className={styles.user_microphone}>
                        <FontAwesomeIcon icon={faMicrophone} />
                    </div>
                </div>
                }

            </div>
            <div className={styles.chatnavbarcall_settings}>
                <div className={styles.settings_option}>
                    <FontAwesomeIcon icon={faVideo} />
                    <div className={styles.option_dw}>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                </div>
                <div className={styles.settings_option}>
                    <FontAwesomeIcon icon={faDesktop} />
                </div>
                <div className={`${styles.settings_option} ${styles.white}`}>
                    <FontAwesomeIcon icon={faMicrophoneSlash} />
                    <div className={`${styles.option_dw} ${styles.dw_white}`}>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                </div>
                <div
                    className={`${styles.settings_option} ${styles.red}`}
                    onClick={closeCall}
                >
                    <FontAwesomeIcon icon={faPhoneSlash} />
                </div>
            </div>
        </div>
  )
}

export default ChatNavbarCall
