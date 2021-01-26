// dependencies
import React, { memo } from 'react'

// external files
import './ChatWelcome.css'

const ChatWelcome = ({ friend }) => {
  return (
        <div className="ChatWelcome">
            {
                friend !== undefined &&
                <>
                    <img
                        className="chatWelcome-img"
                        src={`/imagePerfil/${friend.imagePerfilDefault}`}
                        alt="perfil"
                    />

                    <div className="chatWelcome-user">
                        {friend.name}
                    </div>

                    <div className="chatWelcome-text">
                        This is the beginning of your direct message history with @{friend.name}
                    </div>
                </>
            }
        </div>
  )
}

export default memo(ChatWelcome)
