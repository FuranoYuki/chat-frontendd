import React from 'react'

// styles
import styles from './Message.module.css'

const Message = () => {
  return (
    <div className="pedding-message">

        <div className={styles.message_img}>
        </div>

        <div className={styles.message_text}>
            There are no pedding friend requests. Here&apos;s Wumpus for now.
        </div>
    </div>
  )
}

export default Message
