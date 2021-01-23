import React from 'react'
// fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'
// css
import './View.css'
// api
import api from '../../../../services/http/api'
import socket from '../../../../services/websocket/socket'

const View = ({ pending }) => {
  // functions
  const mouseOver = () => {
    document.querySelector('.peding-field-west-info-code').style.display = 'flex'
  }

  const mouseOut = () => {
    document.querySelector('.peding-field-west-info-code').style.display = 'none'
  }

  const recusePending = () => {
    api.post('/user/recusePending', {
      id: document.querySelector('.peding-field-east-icon.recuse').id
    }).then(() => {
      socket.emit('pending')
    }).catch(error => {
      console.log(error.response.data)
    })
  }

  const acceptPending = () => {
    api.post('/user/acceptPending', {
      id: document.querySelector('.peding-field-east-icon.accept').id
    }).then(() => {
      socket.emit('pending')
    }).catch(error => {
      console.log(error.response.data)
    })
  }

  // jsx
  return (
        <div className="peding-view">

            {
            pending !== undefined &&
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
                                            id={data.user._id}
                                        >
                                            <FontAwesomeIcon icon={faCheck} />
                                        </div>
                                    }
                                    <div
                                        className="peding-field-east-icon recuse"
                                        onClick={recusePending}
                                        id={data.user._id}
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
