import React, { useEffect } from 'react'
// redux
import { useDispatch } from 'react-redux'
// action
import HomeNavbarAction from '../../../../store/actions/HomeNavbarAction'
// styles
import styles from './Message.module.css'

const Message = ({ online }) => {
  const dispatch = useDispatch()

  const addFriend = () => {
    dispatch(HomeNavbarAction('Add Friend'))
  }

  useEffect(() => {
    const obj = document.querySelector('.pedding-message-img')
    if (online) {
      obj.style.backgroundImage = "url('https://discord.com/assets/a12ff54c4c5c03b41006fd96a4709c29.svg')"
    } else {
      obj.style.backgroundImage = "url('https://discord.com/assets/b5eb2f7d6b3f8cc9b60be4a5dcf28015.svg')"
    }
  }, [online])

  return (
    <div className="pedding-message">

        <div className={`${styles.message_img} pedding-message-img`}>
        </div>

        {online
          ? <div className={styles.message_body}>
              <div className={styles.body_text}>
                No one&apos;s around to play with Wumpus.
              </div>
            </div>
          : <div className={styles.message_body}>
              <div className={styles.body_text}>
                Wumpus is waiting on friends. You don&apos;t have to though!
              </div>
              <button
                className={styles.body_btnAdd}
                onClick={addFriend}
              >
                Add Friend
              </button>
            </div>
        }
    </div>
  )
}

export default Message
