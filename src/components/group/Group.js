// dependencies
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
// style
import styles from './Group.module.css'
// icon
import icon from '../../assets/discord.png'
// soocket
import socket from '../../services/websocket/socket'
// api
import api from '../../services/http/api'
// error
import ErrorHandler from '../errorHandler/ErrorHandler'

const Group = () => {
  const { friend } = useParams()
  const [notifications, setNotifications] = useState('')

  const groupMouseOver = event => {
    const sign = event.currentTarget.firstElementChild
    sign.style.display = 'flex'
    sign.style.height = 20 + 'px'
  }

  const groupMouseOut = event => {
    event.currentTarget.firstElementChild.style.display = 'none'
  }

  const getNotifications = () => {
    api.post('/user/getUserNotification')
      .then(res => {
        setNotifications(res.data)
      })
      .catch(error => {
        ErrorHandler(error)
      })
  }

  const removeNotification = async () => {
    try {
      await api.post('/user/removeUserNotification', { friend_id: friend })
      getNotifications()
    } catch (error) {
    }
  }

  function decide () {
    const path = window.location.pathname.split('/')
    if (!path[2]) {
      getNotifications()
    } else if (path[2] && notifications.length) {
      const compare = notifications.filter(data => data.from._id === path[2])
      compare.length ? removeNotification() : getNotifications()
    } else if (path[2] && !notifications.length) {
      api.post('/user/getUserNotification')
        .then(res => {
          const compare = res.data.filter(data => data.from._id === path[2])
          compare.length ? removeNotification() : setNotifications(res.data)
        })
    }
  }

  useEffect(() => {
    socket.on('newMessage', () => {
      decide()
    })
    getNotifications()
    decide()
  }, [])

  useEffect(() => {
    if (friend && notifications.length) {
      decide()
    }
  }, [friend, notifications])

  return (
    <div className={styles.group}>
        {
        notifications.length &&

        notifications.map(data =>
            <Link
                to={`/chat/${data.from._id}`}
                className={styles.group_discord}
                onMouseOver={groupMouseOver}
                onMouseOut={groupMouseOut}
                key={data._id}
            >

                <div className={styles.discord_sign}>
                </div>

                <div className={styles.discord_img}>
                    <img
                        src={data.from.imagePerfil === undefined ? data.from.imagePerfilDefault : data.from.imagePerfil.path}
                        alt='icon'
                    />
                    <div className={styles.mssg_number}>
                        {data.messageNumber}
                    </div>
                </div>

                <div className={styles.discord_legend}>
                    Home
                </div>

            </Link>
        )
        }

        <Link
            to="/"
            className={styles.group_discord}
            onMouseOver={groupMouseOver}
            onMouseOut={groupMouseOut}
        >

            <div className={styles.discord_sign}>
            </div>

            <div className={styles.discord_img}>
                <img
                    src={icon}
                    alt='icon'
                />
            </div>

            <div className={styles.discord_legend}>
                Home
            </div>

        </Link>

        <ul className={styles.groups}>

            <li className={styles.groups_li}
                onMouseOver={groupMouseOver}
                onMouseOut={groupMouseOut}
            >

                <div className={styles.groups_sign}>

                </div>

                <div className={styles.groups_perfil}>
                    <div className={styles.groups_img}>

                    </div>
                </div>
            </li>

        </ul>

    </div>
  )
}

export default Group
