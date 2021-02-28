import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
import styles from './CallController.module.css'
// Errors handler
import ErrorHandler from '../errorHandler/ErrorHandler'
// component
import CountConfig from '../CountConfig/CountConfig'
import WebRTC from '../webRTC/WebRTC'
// action
import userUpdateAction from '../../store/actions/userUpdate'

const CallController = () => {
  const dispatch = useDispatch()
  const statusList = useRef(null)
  const _isMounted = useRef(false)
  const microphoneObj = useRef(null)
  const [user, setUser] = useState(false)
  const [stream, setStream] = useState(false)
  const mute = useSelector(state => state.call.mute)
  const userUpdate = useSelector(state => state.userUpdate)

  const microPhoneIconChange = useCallback((boon = true) => {
    setStream(boon)
  }, [stream])

  const statusChange = useCallback(async (event) => {
    if (user.status !== event.currentTarget.id) {
      try {
        const res = await api.post('/user/changeStatus', { status: event.currentTarget.id })
        setUser({ ...user, status: res.data.status })
        socket.emit('changeStatus', ({ friends: user.friends }))
      } catch (error) {
        ErrorHandler(error)
      }
    }
  }, [user])

  const changeStatus = () => {
    statusList.current.style.display === 'flex'
      ? statusList.current.style.display = 'none'
      : statusList.current.style.display = 'flex'
  }

  const getUser = async () => {
    try {
      const res = await api.post('/user/getUserBasicInfo')
      setUser(res.data)
    } catch (error) {
      ErrorHandler(error)
    }
  }

  const openConfig = () => {
    document.querySelector('.CountConfig').style.display = 'flex'
  }

  useEffect(() => {
    const obj = document.querySelector('#microphoneON')
    if (obj) {
      microphoneObj.current.id = 'microphoneOFF'
    } else {
      microphoneObj.current.id = 'microphoneON'
    }
  }, [mute])

  useEffect(() => {
    _isMounted.current = true
    return () => {
      _isMounted.current = false
    }
  })

  useEffect(() => {
    getUser()
    // api.post('/user/userOnline').then(() => {
    //   getUser()
    //   setTimeout(() => {
    //     socket.emit('changeStatus', ({ friends: user.friends }))
    //   }, 3000)
    // })

    return () => {
      api.post('/user/userOffline').then(() => {
        socket.emit('changeStatus', ({ friends: user.friends }))
      })
    }
  }, [])

  useEffect(() => {
    if (user) {
      if (!socket.connected) {
        socket.connect()
      }
      socket.emit('userRoom', `${user.name + '' + user.code}`)
    }
  }, [user])

  useEffect(() => {
    if (userUpdate.image || userUpdate.name) {
      dispatch(userUpdateAction({ image: false, name: false }))
      getUser()
      socket.emit('changeStatus', ({ friends: user.friends }))
    }
  }, [userUpdate.image, userUpdate.name])

  return (
      <>
        <div className={styles.social_settings}>
          {user &&
            <div className={styles.settings_info}>
              <div
                className={styles.info_status}
                onClick={changeStatus}
              >
                <img
                  src={user.imagePerfil === undefined ? user.imagePerfilDefault : user.imagePerfil.path}
                  alt="perfil"
                  className={styles.status_img}
                />

                <div className={styles.status_layer1}>
                  <div className={`${styles.status_layer2} ${user.status}`}>
                    <div className={`${styles.status_layer3} ${user.status}`}>
                    </div>
                  </div>
                </div>

                <div
                  className={styles.status_list}
                  ref={statusList}
                >

                  <div
                    className={styles.list_li}
                    onClick={statusChange}
                    id="Online"
                  >
                    <div className={`${styles.li_icon} Online`}>
                      <div className={styles.li_icon_2}>
                      </div>
                    </div>
                    <div className={styles.li_text}>
                        Online
                    </div>
                  </div>

                  <div
                    className={styles.list_li}
                    onClick={statusChange}
                    id="Idle"
                  >
                    <div className={`${styles.li_icon} Idle`}>
                      <div className={styles.li_icon_2}>
                      </div>
                    </div>
                    <div className={styles.li_text}>
                        Idle
                    </div>
                  </div>

                  <div
                    className={styles.list_li}
                    onClick={statusChange}
                    id="DND"
                  >
                    <div className={`${styles.li_icon} DND`}>
                      <div className={styles.li_icon_2}>
                      </div>
                    </div>
                    <div className={styles.li_text}>
                      <div className="social__settings-info-li-text-header">
                        Do Not Disturb
                      </div>
                      <div className={styles.text_body}>
                        You will not appear online, but will have full access to all of Discord.
                      </div>
                    </div>
                  </div>

                  <div
                    className={styles.list_li}
                    onClick={statusChange}
                    id="Offline"
                  >
                    <div className={`${styles.li_icon} Invisible`}>
                      <div className={styles.li_icon_2}>
                      </div>
                    </div>
                    <div className={styles.li_text}>
                      <div className="social__settings-info-li-text-header">
                        Invisible
                      </div>
                      <div className={styles.text_body}>
                        You will not appear online, but will have full access to all of Discord.
                      </div>
                    </div>
                  </div>

                  <div className={styles.list_li}>
                    <div className={styles.li_icon}>
                    </div>
                    <div className={styles.li_text}>
                      Set a custom status
                    </div>
                  </div>

                </div>
              </div>

              <div className={styles.info_user}>
                <span className={styles.user_name}>
                  {user.name}
                </span>
                <span className="social__settings--info--user-code">
                  {user.code}
                </span>
              </div>

            </div>
          }

          <ul className={styles.settings_actions}>

            {mute
              ? <li
                ref={microphoneObj}
                className={`${styles.actions_li} social-microphone`}
                id="microphoneON"
                onClick={microPhoneIconChange}
              >
                <FontAwesomeIcon icon={faMicrophone} />
              </li>
              : <li
                ref={microphoneObj}
                className={`${styles.actions_li} social-microphone`}
                id="microphoneOFF"
                onClick={microPhoneIconChange}
              >
                <FontAwesomeIcon icon={faMicrophoneAltSlash} />
              </li>
            }

            <li className={`${styles.actions_li} social-headphones`}>
              <FontAwesomeIcon icon={faHeadphones} />
            </li>
            <li
              className={`${styles.actions_li} social-cog`}
              onClick={openConfig}
            >
              <FontAwesomeIcon icon={faCog} />
            </li>
          </ul>
        </div>
        <CountConfig/>

        {_isMounted &&
          <WebRTC
            user={user} stream={stream}
            microPhoneIconChange={microPhoneIconChange}
          />
        }
    </>
  )
}

export default CallController
