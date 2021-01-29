import React, { useState, useEffect, useCallback, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMicrophone,
  faMicrophoneAltSlash,
  faHeadphones,
  faCog
} from '@fortawesome/free-solid-svg-icons'
// api
import api from '../../services/http/api'
// socket-io
import socket from '../../services/websocket/socket'
// style
import './CallController.css'
// Errors handler
import ErrorHandler from '../errorHandler/ErrorHandler'
// component
import CountConfig from '../CountConfig/CountConfig'
import WebRTC from '../webRTC/WebRTC'

const CallController = () => {
  const microphoneObj = useRef(null)
  const [user, setUser] = useState('')
  const [mute, setMute] = useState(false)
  const [stream, setStream] = useState(false)

  const changeMute = (state) => {
    setMute(state)
  }

  const microPhoneIconChange = useCallback((boon = true) => {
    setStream(boon)
  }, [changeMute, stream, mute])

  useEffect(() => {
    const obj = document.querySelector('#microphoneON')
    if (obj) {
      microphoneObj.current.id = 'microphoneOFF'
    } else {
      microphoneObj.current.id = 'microphoneON'
    }
  }, [mute])

  const changeStatus = () => {
    const obj = document.querySelector('.social__settings--info--status-list')
    obj.style.display === 'flex' ? obj.style.display = 'none' : obj.style.display = 'flex'
  }

  const statusChange = async (event) => {
    if (user.status !== event.currentTarget.id) {
      try {
        const res = await api.post('/user/changeStatus', { status: event.currentTarget.id })
        setUser(res.data)
        socket.emit('changeStatus', ({ friends: res.data.friends }))
      } catch (error) {
        ErrorHandler(error)
      }
    }
  }

  const getUser = async () => {
    try {
      const response = await api.post('/user/getUserBasicInfo')
      setUser(response.data)
    } catch (error) {
      ErrorHandler(error)
    }
  }

  const openConfig = () => {
    document.querySelector('.CountConfig').style.display = 'flex'
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
      <>
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

                {mute
                  ? <li
                    ref={microphoneObj}
                    className="social__settings--actions-li social-microphone"
                    id="microphoneON"
                    onClick={microPhoneIconChange}
                >
                    <FontAwesomeIcon icon={faMicrophone} />
                </li>
                  : <li
                    ref={microphoneObj}
                    className="social__settings--actions-li social-microphone"
                    id="microphoneOFF"
                    onClick={microPhoneIconChange}
                >
                    <FontAwesomeIcon icon={faMicrophoneAltSlash} />
                </li>
                }

                <li className="social__settings--actions-li social-headphones">
                    <FontAwesomeIcon icon={faHeadphones} />
                </li>
                <li
                    className="social__settings--actions-li social-cog"
                    onClick={openConfig}
                >
                    <FontAwesomeIcon icon={faCog} />
                </li>
            </ul>
        </div>
        <CountConfig/>
        <WebRTC user={user} mute={mute} changeMute={changeMute} stream={stream} microPhoneIconChange={microPhoneIconChange}/>
    </>
  )
}

export default CallController
