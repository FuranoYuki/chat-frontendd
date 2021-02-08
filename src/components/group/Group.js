// dependencies
import React, { memo, useEffect, useState, useRef } from 'react'
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
  const mounted = useRef(null)
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
    if (mounted.current && !friend) {
      api.post('/user/getUserNotification')
        .then(res => {
          setNotifications(res.data)
        })
        .catch(error => {
          ErrorHandler(error)
        })
    }
    if (mounted.current && friend) {
      api.post('/user/removeUserNotification', { friend_id: friend })
        .then(() => {
          getNotifications()
        })
    }
  }

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  useEffect(() => {
    socket.on('newMessage', () => {
      if (mounted.current) {
        getNotifications()
      }
    })
  }, [])

  return (
    <div className={styles.group}>
        {
            notifications.notifications !== undefined &&

            notifications.notifications.map(data =>
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

                    {/* <div className={styles.groups_layer1}>
                        <div className={styles.groups_layer2}>
                            <div className={styles.groups_layer3}>
                                1
                            </div>
                        </div>
                    </div> */}

                </div>
{/*
                <div className="group__groups--legend">
                    Home
                </div> */}

            </li>

        </ul>

    </div>
  )
}

export default memo(Group)
