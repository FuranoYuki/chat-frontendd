import React, { useEffect } from 'react'
// styles
import './ChatNavbarCall.css'
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

const ChatNavbarCall = () => {
  const call = useSelector(state => state.call)
  const dispatch = useDispatch()

  const closeCall = () => {
    document.querySelector('.ChatNavbarCall').style.display = 'none'
    document.querySelector('.chatNavbar').style.backgroundColor = 'transparent'
    document.querySelector('.chatNavbar-main').style.borderBottom = '1px solid rgb(11, 10, 10)'
    dispatch(callAction({ navbar: false, inCall: false }))
  }

  const openNavbar = () => {
    document.querySelector('.ChatNavbarCall').style.display = 'flex'
    document.querySelector('.chatNavbar').style.backgroundColor = 'rgb(18, 16, 19)'
    document.querySelector('.chatNavbar-main').style.border = 'none'
  }

  useEffect(() => {
    call.navbar ? openNavbar() : closeCall()
  }, [call.navbar])

  return (
        <div className="ChatNavbarCall">
            <div className="chatnavbarcall-users">

                {call.friendInCall &&
                <div className="chatnavbarcall-user outsider">
                    <img
                        className="chatnavbarcall-user-img"
                        src="https://discord.com/assets/6debd47ed13483642cf09e832ed0bc1b.png"
                    />
                    <div className="chatnavbarcall-user-microphone">
                        <FontAwesomeIcon icon={faMicrophone} />
                    </div>
                </div>
                }

                {call.inCall &&
                <div className="chatnavbarcall-user you">
                    <img
                        className="chatnavbarcall-user-img"
                        src="https://discord.com/assets/6debd47ed13483642cf09e832ed0bc1b.png"
                    />
                    <div className="chatnavbarcall-user-microphone">
                        <FontAwesomeIcon icon={faMicrophone} />
                    </div>
                </div>
                }

            </div>
            <div className="chatnavbarcall-settings">
                <div className="chatnavbarcall-settings-option black">
                    <FontAwesomeIcon icon={faVideo} />
                    <div className="chatnavbarcall-settings-option-dw">
                        <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                </div>
                <div className="chatnavbarcall-settings-option black">
                    <FontAwesomeIcon icon={faDesktop} />
                </div>
                <div className="chatnavbarcall-settings-option white">
                    <FontAwesomeIcon icon={faMicrophoneSlash} />
                    <div className="chatnavbarcall-settings-option-dw white">
                        <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                </div>
                <div
                    className="chatnavbarcall-settings-option red"
                    onClick={closeCall}
                >
                    <FontAwesomeIcon icon={faPhoneSlash} />
                </div>
            </div>
        </div>
  )
}

export default ChatNavbarCall
