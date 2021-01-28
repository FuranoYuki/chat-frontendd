import React, { useEffect, useState } from 'react'
// css
import './RemoveFriend.css'
// api
import api from '../../../../services/http/api'
// token
import ErrorHandler from '../../../errorHandler/ErrorHandler'

const RemoveFriend = (props) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    const user = props.user.split('#')
    setUser({ id: user[0].replace('#', ''), name: user[1] })
  }, [props.user])

  // functios
  const cancelRemove = () => {
    document.querySelector('.RemoveFriend').style.display = 'none'
  }

  const cancelModal = (event) => {
    if (event.currentTarget === event.target) {
      cancelRemove()
    }
  }

  const removeFriend = () => {
    api.post('/user/removeFriend', { id: user.id, name: user.name })
      .then(() => {
        cancelRemove()
      })
      .catch(error => {
        ErrorHandler(error)
      })
  }

  return (
    <div onClick={cancelModal} className="RemoveFriend">
    {
        user.name &&
        <div className="removeFriends-modal">

            <div className="removeFriends-modal-header">
                Remove {`'${user.name.toUpperCase()}'`}
            </div>

            <div className="removeFriends-modal-body">
                Are you sure you want to permanently remove
                <span>{` ${user.name}`}</span>  from your friends?
            </div>

            <div className="removeFriends-modal-bottom">

                <button onClick={cancelRemove} className="removeFriends-modal-bottom-cancel">
                    Cancel
                </button>

                <button onClick={removeFriend} className="removeFriends-modal-bottom-remove">
                    Remove Friend
                </button>
            </div>

        </div>
    }
    </div>
  )
}

export default RemoveFriend
