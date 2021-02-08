import React, { memo, useEffect, useRef } from 'react'
// style
import styles from './ChatMessage.module.css'

const ChatMessage = ({ chat, scroll }) => {
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  })

  useEffect(() => {
    if (isMounted) {
      scroll()
    }
  }, [isMounted])

  return (
    <>
      {chat.messages !== undefined &&

      chat.messages.map(message =>

        <div
          key={message._id}
          className={styles.chatmessage}
        >
          <div className="chatMessage-perfil">

            {message.user === chat.user._id
              ? <img
                className={styles.perfil_img}
                alt="perfil"
                src={chat.user.imagePerfil === undefined ? chat.user.imagePerfilDefault : chat.user.imagePerfil.path}
              />
              : <img
                className={styles.perfil_img}
                alt="perfil"
                src={chat.friend.imagePerfil === undefined ? chat.friend.imagePerfilDefault : chat.friend.imagePerfil.path}
              />
            }

          </div>

          <div className={styles.chatmessage_msg}>

            <div className={styles.msg_info}>
              <div className={styles.info_name}>
                {message.user === chat.user._id ? chat.user.name : chat.friend.name}
              </div>

              <div className={styles.info_data}>
                {new Date(message.createdAt).toUTCString().replace('GMT', '')}
              </div>
            </div>

            <div className={styles.msg_text}>
              {message.text}
            </div>

          </div>

        </div>
      )
      }
    </>
  )
}

export default memo(ChatMessage)
