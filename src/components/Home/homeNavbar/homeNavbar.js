// dependencies
import React, { useEffect, useState, memo } from 'react'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInbox, faCommentAlt, faQuestionCircle, faUserFriends } from '@fortawesome/free-solid-svg-icons'
// external files
import styles from './homeNavbar.module.css'
// action redux
import HomeNavbarAction from '../../../store/actions/HomeNavbarAction'

const HomeNavbar = ({ pending }) => {
  const dispatch = useDispatch()
  const [pendingLength, setPendingLength] = useState(0)

  const navbarClick = (event) => {
    const obj = event.currentTarget.firstElementChild.firstElementChild.innerText
    dispatch(HomeNavbarAction(obj))
  }

  useEffect(() => {
    if (pending) {
      setPendingLength(pending.filter(data => data.receiver === true).length)
    }
  }, [pending])

  return (
    <div className={styles.homenavbar}>

        <ul className={styles.homenavbar_nav}>
            <li className={styles.li_seperator}>
                <FontAwesomeIcon icon={faUserFriends}/>
                <span>Friends</span>
            </li>
            <li className={styles.li} onClick={navbarClick}>
                <div>
                    <div>
                        Online
                    </div>
                </div>
            </li>
            <li className={styles.li} onClick={navbarClick}>
                <div>
                    <div>
                        All
                    </div>
                </div>
            </li>
            <li className={styles.li} onClick={navbarClick}>
                <div>
                    <div>Pending</div>

                    {
                        pendingLength > 0 &&

                        <div className={styles.li_feed}>
                            <div className={styles.count_pending}>
                                {pendingLength}
                            </div>
                        </div>
                    }

                </div>

            </li>
            <li className={styles.li} onClick={navbarClick}>
                <div>
                    <div>
                        Blocked
                    </div>
                </div>
            </li>
            <li className={`${styles.li} ${styles.li_add_friends}`} onClick={navbarClick}>
                <div>
                    <div>
                        Add Friend
                    </div>
                </div>
            </li>
        </ul>

        <ul className={styles.homenavbar_options}>
            <li className={`${styles.options_li} ${styles.li_separator}`}>
                <FontAwesomeIcon icon={faCommentAlt} />
            </li>
            <li className={styles.options_li}>
                <FontAwesomeIcon icon={faInbox} />
            </li>
            <li className={styles.options_li}>
                <FontAwesomeIcon icon={faQuestionCircle} />
            </li>
        </ul>

    </div>
  )
}

export default memo(HomeNavbar)
