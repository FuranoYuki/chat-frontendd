// dependencies
import React, { useEffect, useState, memo } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserFriends,
  faPlus,
  faTimes
} from '@fortawesome/free-solid-svg-icons'

// style
import './Social.css'
// api
import api from '../../services/http/api'
// socket-io
import socket from '../../services/websocket/socket'
// component
import CallController from '../callController/CallController'

const Social = () => {
  // Hook - States
  const [chat, setChats] = useState({})
  const [search, setSearch] = useState('')

  // Hook - Effects
  useEffect(() => {
    getChats()
  }, [])

  // socket
  useEffect(() => {
    socket.on('friendChangeStatus', () => {
      getChats()
    })
  }, [])

  // functions
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

  const getChats = () => {
    api.post('/user/getUserChats')
      .then(data => {
        setChats(data.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
        <div className="Social">

            <form className="social__search">
                <input
                    className="social__search--input"
                    placeholder="Encontre ou comece uma conversa"
                    onChange={searchChange}
                />
            </form>

            <div className="social__body">

                <ul className="social__body--to_do">

                    <li className="social__body--to_do-li">
                        <Link className="social__body--to_do-link" to="/">
                            <FontAwesomeIcon icon={faUserFriends}/>
                            <span>Amigos</span>
                        </Link>
                    </li>

                    <li className="social__body--to_do-li">
                        <Link className="social__body--to_do-link" to="#">
                            <FontAwesomeIcon icon={faPlus}/>
                            <span>Create Group</span>
                        </Link>
                    </li>

                </ul>

                <ul className="social__body--friends">
                    <div className="social_body-friends-header">
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
                                className="social__body--friends-li"
                                onMouseOut={hiddenDeleteFriend}
                            >

                                <Link to={`/chat/${friend._id}`} className="social__body--friends-link">
                                    <div className="social__body-friends-icon">

                                        {friend.imagePerfilDefault !== undefined &&
                                        <img
                                            className="social__body-friends-icon-img"
                                            src={`/imagePerfil/${friend.imagePerfilDefault}`}
                                            alt="perfil"
                                        />
                                        }

                                        <div className='social__body-friends-icon-layer1'>
                                            <div className={`social__body-friends-icon-layer2 ${friend.status}`}>
                                                <div className={`social__body-friends-icon-layer3 ${friend.status}`}>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <span>{friend.name}</span>
                                </Link>
                                <div className="social__delete-friend">
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

export default memo(Social)
