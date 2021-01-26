// dependencies
import React, { memo } from 'react'
import { useForm } from 'react-hook-form'
// css
import './AddFriend.css'
// socket
import socket from '../../../services/websocket/socket'
// api
import api from '../../../services/http/api'
// redux
import { useDispatch } from 'react-redux'
// action
import notification from '../../../store/actions/notification'

const AddFriend = () => {
  // form
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()

  const addFriendSubmit = async (data) => {
    const { user: name, code } = data
    const warning = document.querySelector('.addFriend__body')

    if (name.length > 0 && code.length === 5) {
      try {
        await api.post('/user/pendingAdd', { name, code })
        socket.emit('pending', `${name + '' + code}`)
        dispatch(notification({ pending: true }))
        document.querySelector('.addFriend__form--input').value = ''
        document.querySelector('.addFriend__inputCode').value = ''

        warning.innerHTML = `Success! Your friend request to ${name + '' + code} was sent.`
        warning.style.color = '#43b581'
      } catch (error) {
        warning.innerHTML = 'Hm, didn\'t work. Double check that the capitalization, spelling, any spaces and number are correct.'
        warning.style.color = '#f04747'
      }
    } else {
      warning.innerHTML = `We need ${name}'s for digit tag so we know which one they are`
      warning.style.color = '#f04747'
    }
  }

  const abledButton = (event) => {
    const button = document.querySelector('.addFriend__form--button')
    event.target.value.length > 0 ? button.disabled = false : button.disabled = true
  }

  // JSX
  return (
        <div className="AddFriend">

            <div className="addFriend__header">
                ADD FRIEND
            </div>

            <div className="addFriend__body">
                You can add a friend with their Discord tag. It&apos;s cAsE sEnSitIvE!
            </div>

            <form onSubmit={handleSubmit(addFriendSubmit)} className="addFriend__form">

                <input
                    placeholder="Enter a username"
                    className="addFriend__form--input"
                    name="user"
                    ref={register}
                    onChange={abledButton}
                />
                <input
                  placeholder="#0000"
                  className="addFriend__inputCode"
                  name="code"
                  ref={register}
                />

                <button disabled={true} className="addFriend__form--button">
                    Send a Friend Request
                </button>

            </form>
        </div>
  )
}

export default memo(AddFriend)
