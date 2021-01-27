import React, { useState, useEffect, memo } from 'react'
import './CallController.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMicrophone,
  faMicrophoneAltSlash,
  faHeadphones,
  faCog
} from '@fortawesome/free-solid-svg-icons'
import api from '../../services/http/api'
import socket from '../../services/websocket/socket'
import { Link } from 'react-router-dom'

const CallController = () => {
  const [microPhoneIcon, setMicroPhoneIcon] = useState(faMicrophone)
  const [user, setUser] = useState('')

  const microPhoneStatus = () => {
    const obj = document.querySelector('#microphoneON')

    if (obj) {
      obj.id = 'microphoneOFF'
      setMicroPhoneIcon(faMicrophoneAltSlash)
    } else {
      document.querySelector('#microphoneOFF').id = 'microphoneON'
      setMicroPhoneIcon(faMicrophone)
    }
  }

  const changeStatus = () => {
    const obj = document.querySelector('.social__settings--info--status-list')
    obj.style.display === 'flex' ? obj.style.display = 'none' : obj.style.display = 'flex'
  }

  const statusChange = async (event) => {
    if (user.status !== event.currentTarget.id) {
      try {
        const response = await api.post('/user/changeStatus', { status: event.currentTarget.id })
        setUser(response.data)
        socket.emit('changeStatus', ({ friends: response.data.friends }))
      } catch (error) {
        console.log(error)
      }
    }
  }

  const getUser = async () => {
    try {
      const response = await api.post('/user/getUserBasicInfo')
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user._id !== undefined) {
      socket.emit('userRoom', `${user.name + '' + user.code}`)
    }
  }, [user])

  useEffect(() => {
    getUser()
  }, [])

  return (
        <div className="social__settings">

            <div className="social__settings--info">

                <div
                    className="social__settings--info--status"
                    onClick={changeStatus}
                >

                    {user.imagePerfilDefault !== undefined &&
                    <img
                        src={`/imagePerfil/${user.imagePerfilDefault}`}
                        alt="perfil"
                        className="social__settings--info--status-img"
                    />
                    }

                    <div className="social__settings--info--status-layer1">
                        <div className={`social__settings--info--status-layer2 ${user.status}`}>
                            <div className={`social__settings--info--status-layer2 ${user.status}`}>

                            </div>
                        </div>
                    </div>

                    <div
                        className="social__settings--info--status-list"
                    >

                        <div
                            className="social__settings-info--status-list-li online"
                            onClick={statusChange}
                            id="Online"
                        >
                            <div className="social__settings-info-li-icon">
                                <div className="social__settings-info-li-icon-2 Online">

                                </div>
                            </div>
                            <div className="social__settings-info-li-text">
                                Online
                            </div>
                        </div>

                        <div
                            className="social__settings-info--status-list-li"
                            onClick={statusChange}
                            id="Idle"
                        >
                            <div className="social__settings-info-li-icon">
                                <div className="social__settings-info-li-icon-2 Idle">

                                </div>
                            </div>
                            <div className="social__settings-info-li-text">
                                Idle
                            </div>
                        </div>

                        <div
                            className="social__settings-info--status-list-li"
                            onClick={statusChange}
                            id="DND"
                        >
                            <div className="social__settings-info-li-icon">
                                <div className="social__settings-info-li-icon-2 DND">

                                </div>
                            </div>
                            <div className="social__settings-info-li-text">
                                <div className="social__settings-info-li-text-header">
                                    Do Not Disturb
                                </div>
                                <div className="social__settings-info-li-text-body">
                                    You will not appear online, but will have full access to all of Discord.
                                </div>
                            </div>
                        </div>

                        <div
                            className="social__settings-info--status-list-li"
                            onClick={statusChange}
                            id="Offline"
                        >
                            <div className="social__settings-info-li-icon">
                                <div className="social__settings-info-li-icon-2 Invisible">

                                </div>
                            </div>
                            <div className="social__settings-info-li-text">
                                <div className="social__settings-info-li-text-header">
                                    Invisible
                                </div>
                                <div className="social__settings-info-li-text-body">
                                    You will not appear online, but will have full access to all of Discord.
                                </div>
                            </div>
                        </div>

                        <div className="social__settings-info--status-list-li custom">
                            <div className="social__settings-info-li-icon">

                            </div>
                            <div className="social__settings-info-li-text">
                                Set a custom status
                            </div>
                        </div>

                    </div>

                </div>

                <div className="social__settings--info--user">
                    <span className="social__settings--info--user-name">
                        {user.name}
                    </span>
                    <span className="social__settings--info--user-code">
                        {user.code}
                    </span>
                </div>

            </div>

            <ul className="social__settings--actions">
                <li
                    className="social__settings--actions-li social-microphone"
                    id="microphoneON"
                    onClick={microPhoneStatus}
                >
                    <FontAwesomeIcon icon={microPhoneIcon} />
                </li>
                <li className="social__settings--actions-li social-headphones">
                    <FontAwesomeIcon icon={faHeadphones} />
                </li>
                <li className="social__settings--actions-li social-cog">
                    <Link to="/config">
                        <FontAwesomeIcon icon={faCog} />
                    </Link>
                </li>
            </ul>
        </div>
  )
}

export default memo(CallController)
