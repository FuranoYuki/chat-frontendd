// dependencies
import React, { memo } from 'react'

// external files
import styles from './ChatWelcome.module.css'

const ChatWelcome = ({ friend }) => {
  return (
    <div className={styles.chatwelcome}>
        {friend !== undefined &&
        <>
            <img
                className={styles.chatwelcome_img}
                src={friend.imagePerfil === undefined ? friend.imagePerfilDefault : friend.imagePerfil.path}
                alt="perfil"
            />

            <div className={styles.chatwelcome_user}>
                {friend.name}
            </div>

            <div className={styles.chatwelcome_text}>
                This is the beginning of your direct message history with @{friend.name}
            </div>
        </>
        }
    </div>
  )
}

export default memo(ChatWelcome)
