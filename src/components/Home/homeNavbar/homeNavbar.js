// dependencies
import React, { useEffect, useState, memo } from 'react'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInbox, faCommentAlt, faQuestionCircle, faUserFriends } from '@fortawesome/free-solid-svg-icons'
// external files
import './homeNavbar.css'
// action redux
import HomeNavbarAction from '../../../store/actions/HomeNavbarAction'

const HomeNavbar = (props) => {
  // Hook-states
  const [pending, setPending] = useState({})
  const [pendingLength, setPendingLength] = useState(0)

  // Hook-effects
  useEffect(() => {
    setPending(props.user.pending)
  }, [props])

  useEffect(() => {
    if (pending !== undefined) {
      if (pending.length > 0) {
        setPendingLength(pending.filter(data => data.receiver === true).length)
      }
    }
  }, [pending])

  // Redux-dispatch
  const dispatch = useDispatch()

  // functions
  const navbarClick = (event) => {
    const obj = event.currentTarget.firstElementChild.firstElementChild.innerText
    dispatch(HomeNavbarAction(obj))
  }

  return (
        <div className="homenavbar">

            <ul className="homenavbar__nav">
                <li className="homenavbar__nav-seperator">
                    <FontAwesomeIcon icon={faUserFriends}/>
                    <span>Friends</span>
                </li>
                <li className="homenavbar__nav-li" onClick={navbarClick}>
                <div>
                        <div>
                            Online
                        </div>
                    </div>
                </li>
                <li className="homenavbar__nav-li" onClick={navbarClick}>
                    <div>
                        <div>
                            All
                        </div>
                    </div>
                </li>
                <li className="homenavbar__nav-li" onClick={navbarClick}>
                    <div>
                        <div>Pending</div>

                        {
                            pendingLength > 0 &&

                            <div className="homenavbar-li-feed">{pendingLength}</div>
                        }

                    </div>

                </li>
                <li className="homenavbar__nav-li" onClick={navbarClick}>
                    <div>
                        <div>
                            Blocked
                        </div>
                    </div>
                </li>
                <li className="homenavbar__nav-li add--friends" onClick={navbarClick}>
                    <div>
                        <div>
                            Add Friend
                        </div>
                    </div>
                </li>
            </ul>

            <ul className="homenavbar__options">
                <li className="homenavbar__options-li seperator">
                    <FontAwesomeIcon icon={faCommentAlt} />
                </li>
                <li className="homenavbar__options-li">
                    <FontAwesomeIcon icon={faInbox} />
                </li>
                <li className="homenavbar__options-li">
                    <FontAwesomeIcon icon={faQuestionCircle} />
                </li>
            </ul>

        </div>
  )
}

export default memo(HomeNavbar)
