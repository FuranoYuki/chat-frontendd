// dependencies
import React, { memo } from 'react'

// external files
import './ChatMessage.css'

const ChatMessage = ({ chat }) => {
  const verifyUser = (id) => {
    if (id === chat.user._id) {
      return (
        <img
            className="chatMessage-perfil-img"
            alt="perfil"
            src={`/imagePerfil/${chat.user.imagePerfilDefault}`}
        />
      )
    } else {
      return (
        <img
            className="chatMessage-perfil-img"
            alt="perfil"
            src={`/imagePerfil/${chat.friend.imagePerfilDefault}`}
        />
      )
    }
  }

  // jsx
  return (

    <>
        {chat.messages !== undefined &&

        chat.messages.map(message =>

            <div
                key={message._id}
                className="ChatMessage">
                <div className="chatMessage-perfil">

                    {
                        verifyUser(message.user)
                    }

                </div>
                <div className="chatMessage-msg">
                    <div className="chatMessage-msg-info">
                        <div className="chatMessage-msg-info-name">
                            {
                                message.user === chat.user._id ? chat.user.name : chat.friend.name
                            }
                        </div>
                        <div className="chatMessage-msg-info-data">
                            {new Date(message.createdAt).toUTCString().replace('GMT', '')}
                        </div>
                    </div>
                    <div className="chatMessage-msg-text">
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
