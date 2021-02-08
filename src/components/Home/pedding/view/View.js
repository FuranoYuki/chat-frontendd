import React, { useRef } from 'react'
// redux
import { useDispatch } from 'react-redux'
// fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'
// styles
import styles from './View.module.css'
// api
import api from '../../../../services/http/api'
// socket
import socket from '../../../../services/websocket/socket'
// action
import notification from '../../../../store/actions/notification'
// error
import ErrorHandler from '../../../errorHandler/ErrorHandler'

const View = ({ pending }) => {
  const code = useRef(null)
  const dispatch = useDispatch()

  const mouseOver = () => {
    code.current.style.display = 'flex'
  }

  const mouseOut = () => {
    code.current.style.display = 'none'
  }

  const recusePending = async (event) => {
    try {
      const data = event.currentTarget.id.split('#')
      await api.post('/user/recusePending', { id: data[0] })
      socket.emit('pendingRecuse', data[1])
      dispatch(notification({ pending: true }))
    } catch (error) {
      ErrorHandler(error)
    }
  }

  const acceptPending = async (event) => {
    try {
      const data = event.currentTarget.id.split('#')
      await api.post('/user/acceptPending', { id: data[0] })
      socket.emit('pendingAccept', data[1])
      dispatch(notification({ pending: true, pendingAccept: true }))
    } catch (error) {
      ErrorHandler(error)
    }
  }

  return (
    <div className={styles.peding_view}>
      {pending !== undefined &&
      <>
        <div className={styles.view_header}>
          PENDING &#9866; {pending.length}
        </div>

        <div className={styles.view_list}>
            {
              pending.map(data =>
                <div
                  key={data._id}
                  className={styles.list_field}
                  onMouseOver={mouseOver}
                  onMouseOut={mouseOut}
                >
                  <div className={styles.field_west}>
                    <div className={styles.west_perfil}>

                        <img
                          className={styles.perfil_img}
                          src={data.user.imagePerfil === undefined ? data.user.imagePerfilDefault : data.user.imagePerfil.path}
                          alt="perfil"
                        />
                        <div className={styles.perfil_on}>
                          <div className={styles.perfil_on2}>
                            <div className={styles.perfil_on3}>
                            </div>
                          </div>
                        </div>

                    </div>

                    <div className={styles.west_info}>
                      <div className={styles.info_names}>
                        <span className={styles.info_name}>
                          {data.user.name}
                        </span>
                        <span className={styles.info_code} ref={code}>
                          {data.user.code}
                        </span>
                      </div>
                      <div className={styles.info_message}>
                        {
                          data.sender ? 'Outgoing Friend Request' : 'Incoming Friend Request'
                        }
                      </div>
                    </div>
                  </div>

                  <div className={styles.field_east}>
                    {
                      data.receiver &&
                      <div
                          className={`${styles.east_icon} ${styles.accept}`}
                          onClick={acceptPending}
                          id={`${data.user._id}#${data.user.name + '' + data.user.code}`}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </div>
                    }
                    <div
                        className={`${styles.east_icon} ${styles.recuse}`}
                        onClick={recusePending}
                        id={`${data.user._id}#${data.user.name + '' + data.user.code}`}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </div>
                  </div>
                </div>
              )
            }
        </div>
      </>
      }
    </div>
  )
}

export default View
