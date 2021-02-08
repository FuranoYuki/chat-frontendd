// dependencies
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserFriends,
  faPlus,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
// style
import styles from './Social.module.css'
// api
import api from '../../services/http/api'
// socket-io
import socket from '../../services/websocket/socket'
// component
import CallController from '../callController/CallController'

const Social = () => {
  const [chat, setChats] = useState({})
  const [search, setSearch] = useState('')

  const showDeleteFriend = (event) => {
    event.currentTarget.lastElementChild.style.display = 'flex'
    event.currentTarget.firstElementChild.lastElementChild.style.color = 'white'
  }

  const hiddenDeleteFriend = (event) => {
    event.currentTarget.lastElementChild.style.display = 'none'
    event.currentTarget.firstElementChild.lastElementChild.style.color = 'rgb(174, 166, 166)'
  }

  const searchChange = (event) => {
    setSearch(event.target.value)
  }

  const getChats = async () => {
    try {
      const res = await api.post('/user/getUserChats')
      setChats(res.data)
    } catch (error) {
    }
  }

  useEffect(() => {
    getChats()
  }, [])

  useEffect(() => {
    socket.on('friendChangeStatus', () => {
      getChats()
    })
  }, [])

  return (
    <div className={styles.social}>

      <form className={styles.social_form}>
        <input
          autoComplete='off'
          onChange={searchChange}
          className={styles.form_input}
          placeholder="Find or start a conversation"
        />
      </form>

      <div className={styles.social_body}>

        <ul className={styles.body_list}>
          <li className={styles.list_li}>
            <Link className={styles.li_a} to="/">
                <FontAwesomeIcon icon={faUserFriends}/>
                <span>Friends</span>
            </Link>
          </li>

          <li className={styles.list_li}>
            <Link className={styles.li_a} to="#">
                <FontAwesomeIcon icon={faPlus}/>
                <span>Create Group</span>
            </Link>
          </li>
        </ul>

        <ul className={styles.body_list}>
          <div className={styles.friends_header}>
              DIRECT MESSAGES
          </div>

          {
            chat.chats !== undefined &&

            chat.chats.map(data => data.friend

            ).filter(data => (
              search !== '' ? data.name.includes(search.toLowerCase()) : data

            )).map(friend =>
              <li
                key={friend._id}
                onMouseOver={showDeleteFriend}
                className={styles.friends_li}
                onMouseOut={hiddenDeleteFriend}
              >
                <Link to={`/chat/${friend._id}`} className={styles.friends_li_a}>
                  <div className={styles.friends_icon}>

                    <img
                        className={styles.friends_img}
                        src={friend.imagePerfil === undefined ? friend.imagePerfilDefault : friend.imagePerfil.path}
                        alt="perfil"
                    />

                    <div className={styles.friends_layer1}>
                      <div className={`${styles.friends_layer2} ${friend.status}`}>
                        <div className={`${styles.friends_layer3} ${friend.status}`}>
                        </div>
                      </div>
                    </div>

                  </div>
                  <span>{friend.name}</span>
                </Link>

                <div className={styles.friend_delete}>
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              </li>
            )
          }

        </ul>
        <CallController />
      </div>

    </div>
  )
}

export default Social
