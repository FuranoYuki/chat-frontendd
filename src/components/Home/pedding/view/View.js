import React from 'react'
// fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'
// css
import './View.css'
// api
import api from '../../../../services/http/api'
// socket
import socket from '../../../../services/websocket/socket'
// redux
import { useDispatch } from 'react-redux'
import notification from '../../../../store/actions/notification'

const View = ({ pending }) => {
  const dispatch = useDispatch()

  const mouseOver = () => {
    document.querySelector('.peding-field-west-info-code').style.display = 'flex'
  }

  const mouseOut = () => {
    document.querySelector('.peding-field-west-info-code').style.display = 'none'
  }

  const recusePending = (event) => {
    const data = event.currentTarget.id.split('#')
    console.log(data)
    api.post('/user/recusePending', {
      id: data[0]
    }).then(() => {
      socket.emit('pending', data[1])
      dispatch(notification({ pending: true }))
    }).catch(error => {
      console.log(error)
    })
  }

  const acceptPending = (event) => {
    const data = event.currentTarget.id.split('#')
    console.log(data)
    api.post('/user/acceptPending', {
      id: data[0]
    }).then(() => {
      socket.emit('pending', data[1])
      dispatch(notification({ pending: true }))
    }).catch(error => {
      console.log(error)
    })
  }

  // jsx
  return (
    <div className="peding-view">

        {pending !== undefined &&
        <>
            <div className="peding-view-header">
                Pending - {pending.length}
            </div>

            <div className="peding-view-list">

                {
                    pending.map(data =>
                        <div
                            key={data._id}
                            className="peding-view-list-field"
                            onMouseOver={mouseOver}
                            onMouseOut={mouseOut}
                        >

                            <div className="peding-field-west">

                                <div className="peding-field-west-perfil">

                                    {
                                    data.user.imagePerfil === undefined

                                      ? <img
                                            className="peding-field-west-perfil-img"
                                            src={`/imagePerfil/${data.user.imagePerfilDefault}`}
                                            alt="perfil"
                                        />
                                      : <img
                                            className="peding-field-west-perfil-img"
                                            src={`/imagePerfil/${data.user.imagePerfil.key}`}
                                            alt="perfil"
                                        />
                                    }

                                    <div className="peding-field-west-perfil-on">
                                        <div className="peding-field-west-perfil-on-2">
                                            <div className="peding-field-west-perfil-on-3">

                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="peding-field-west-info">
                                    <div className="peding-field-west-info-names">
                                        <span className="peding-field-west-info-name">
                                            {data.user.name}
                                        </span>
                                        <span className="peding-field-west-info-code">
                                            {data.user.code}
                                        </span>
                                    </div>
                                    <div className="peding-field-west-info-message">
                                        {
                                            data.sender ? 'Outgoing Friend Request' : 'Incoming Friend Request'
                                        }
                                    </div>
                                </div>

                            </div>

                            <div className="peding-field-east">
                                {
                                    data.receiver &&

                                    <div
                                        className="peding-field-east-icon accept"
                                        onClick={acceptPending}
                                        id={`${data.user._id}#${data.user.name + '' + data.user.code}`}
                                    >
                                        <FontAwesomeIcon icon={faCheck} />
                                    </div>
                                }
                                <div
                                    className="peding-field-east-icon recuse"
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
