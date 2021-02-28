// dependencies
import React, { memo, useRef } from 'react'
import { useForm } from 'react-hook-form'
// css
import styles from './AddFriend.module.css'
// socket
import socket from '../../../services/websocket/socket'
// api
import api from '../../../services/http/api'
// redux
import { useDispatch } from 'react-redux'
// action
import notification from '../../../store/actions/notification'

const AddFriend = () => {
  const button = useRef(null)
  const warning = useRef(null)
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  const addFriendSubmit = async (data) => {
    const { user: name, code } = data

    if (name.length > 0 && code.length === 5) {
      try {
        await api.post('/user/pendingAdd', { name, code })
        socket.emit('pendingRequest', `${name + '' + code}`)
        dispatch(notification({ pending: true }))
        document.querySelector('.addFriend__form--input').value = ''
        document.querySelector('.addFriend__inputCode').value = ''

        warning.current.innerHTML = `Success! Your friend request to ${name + '' + code} was sent.`
        warning.current.style.color = '#43b581'
      } catch (error) {
        warning.current.innerHTML = error.response.data.error
        warning.current.style.color = '#f04747'
      }
    } else {
      warning.current.innerHTML = `We need ${name}'s for digit tag so we know which one they are`
      warning.current.style.color = '#f04747'
    }
  }

  const abledButton = (event) => {
    event.target.value.length > 0
      ? button.current.disabled = false
      : button.current.disabled = true
  }

  return (
    <div className={styles.addfriend}>

        <div className={styles.addfriend_header}>
          ADD FRIEND
        </div>

        <div className={styles.addfriend_body} ref={warning}>
          You can add a friend with their Discord tag. It&apos;s cAsE sEnSitIvE!
        </div>

        <form onSubmit={handleSubmit(addFriendSubmit)} className={styles.addfriend_form}>

            <input
              placeholder="username"
              className={`${styles.form_input} addFriend__form--input`}
              name="user"
              ref={register}
              onChange={abledButton}
              autoComplete="off"
            />
            <input
              placeholder="discord tag, default @9090"
              className={`${styles.inputCode} addFriend__inputCode`}
              name="code"
              ref={register}
              maxLength={5}
              autoComplete="off"
            />

            <button disabled={true} className={styles.form_button} ref={button}>
              Send a Friend Request
            </button>

        </form>
    </div>
  )
}

export default memo(AddFriend)
