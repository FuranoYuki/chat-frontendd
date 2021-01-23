// dependencies
import React, { memo } from 'react'
import { useForm } from 'react-hook-form'
// css
import './AddFriend.css'
// socket
import socket from '../../../services/websocket/socket'
// api
import api from '../../../services/http/api'

const AddFriend = () => {
  // form
  const { register, handleSubmit } = useForm()

  // functions
  const addFriendSubmit = async (data) => {
    const divide = data.user.split('#')

    api.post('/user/pendingAdd', {
      name: divide[0],
      code: `@${divide[1]}`
    }).then(() => {
      socket.emit('pending')
    })

    document.querySelector('.addFriend__form--input').value = ''
  }

  // JSX
  return (
        <div className="AddFriend">

            <div className="addFriend__header">
                ADD FRIEND
            </div>

            <div className="addFriend__body">
                You can add a friend with their Discord tag. It&apos;s cAsE sEnSitIvE.
            </div>

            <form onSubmit={handleSubmit(addFriendSubmit)} className="addFriend__form">

                <input
                    placeholder="Enter a username#0000"
                    className="addFriend__form--input"
                    name="user"
                    ref={register}
                />

                <button className="addFriend__form--button">
                    Send a Friend Request
                </button>

            </form>

        </div>
  )
}

export default memo(AddFriend)
