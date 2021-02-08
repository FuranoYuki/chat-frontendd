import React, { useEffect, useState, useRef } from 'react'
// redux
import { useDispatch } from 'react-redux'
// action
import notificationAction from '../../../../store/actions/notification'
// styles
import styles from './RemoveFriend.module.css'
// api
import api from '../../../../services/http/api'
// error
import ErrorHandler from '../../../errorHandler/ErrorHandler'
// socket
import socket from '../../../../services/websocket/socket'

const RemoveFriend = (props) => {
  const dispatch = useDispatch()
  const removefriend = useRef(null)
  const [user, setUser] = useState({})

  const cancelRemove = () => {
    removefriend.current.style.display = 'none'
  }

  const cancelModal = (event) => {
    if (event.currentTarget === event.target) {
      cancelRemove()
    }
  }

  const removeFriend = async () => {
    try {
      await api.post('/user/removeFriend', { id: user.id, name: user.name })
      console.log(user.room)
      socket.emit('friendRemoved', user.room)
      dispatch(notificationAction({ removeFriend: true }))
      cancelRemove()
    } catch (error) {
      ErrorHandler(error)
    }
  }

  useEffect(() => {
    if (props.user) {
      const user = props.user.split('#')
      const name = user[1].split('@')[0]
      setUser({ id: user[0].replace('#', ''), name, room: user[1] })
    }
  }, [props.user])

  return (
    <div onClick={cancelModal} className={`${styles.removefriend} RemoveFriend`} ref={removefriend}>
    {
      user.name &&
      <div className={styles.removefriend_modal}>

          <div className={styles.modal_header}>
              Remove {`'${user.name.toUpperCase()}'`}
          </div>

          <div className={styles.modal_body}>
              Are you sure you want to permanently remove
              <span>{` ${user.name}`}</span>  from your friends?
          </div>

          <div className={styles.modal_bottom}>

              <button onClick={cancelRemove} className={styles.bottom_cancel}>
                  Cancel
              </button>

              <button onClick={removeFriend} className={styles.bottom_remove}>
                  Remove Friend
              </button>
          </div>

      </div>
    }
    </div>
  )
}

export default RemoveFriend
