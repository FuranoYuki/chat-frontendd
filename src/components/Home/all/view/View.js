// React
import React, { useState } from 'react'

// router Link
import { Link } from 'react-router-dom'

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faCommentAlt } from '@fortawesome/free-solid-svg-icons'

// removeFriend component
import RemoveFriend from './removeFriend/RemoveFriend'

// css
import './View.css'

const View = ({ friends, online }) => {
  // hooks-state
  const [userRemove, setUserRemove] = useState('')
  // const [verify, setVerify] = useState(false)
  // const [click, setClick] = useState(false)
  const [field, setField] = useState({})

  // // hooks-effects
  // useEffect(() => {
  //   document.addEventListener('click', () => {
  //     setClick(true)
  //   })
  // }, [])

  // useEffect(() => {
  //   if (!verify && click && field.style) {
  //     field.style.display = 'none'
  //     setClick(false)
  //     setField({})
  //   } else {
  //     setClick(false)
  //   }
  // }, [click])

  // functions
  const mouseOver = (event) => {
    event.currentTarget
      .firstElementChild
      .lastElementChild
      .firstElementChild
      .lastElementChild.style.display = 'flex'
  }

  const mouseOut = (event) => {
    event.currentTarget
      .firstElementChild
      .lastElementChild
      .firstElementChild
      .lastElementChild.style.display = 'none'
  }

  const fieldEast = (event) => {
    const obj = event.currentTarget.lastElementChild

    if (field.style !== undefined) {
      field.style.display = 'none'
    }

    obj.style.display === 'flex' ? obj.style.display = 'none' : obj.style.display = 'flex'

    setField(obj)
  }

  function removeFriend (obj) {
    if (obj !== undefined) {
      setUserRemove(obj.target.id)
      document.querySelector('.RemoveFriend').style.display = 'flex'
    }
  }

  // jsx
  return (
        <div className="all-view">

            {
            friends !== undefined &&
                <>
            {
                online

                  ? <div className="all-view-header">
                        ONLINE - {friends.filter(data => data.status !== 'Offline').length}
                    </div>
                  : <div className="all-view-header">
                        ALL FRIENDS - {friends.length}
                    </div>

            }

                <div className="all-view-list">

                    {
                        friends
                          .filter(data => online ? data.status !== 'Offline' : data)
                          .map(data =>

                            <div
                                key={data._id}
                                className="all-view-list-field"
                                onMouseOver={mouseOver}
                                onMouseOut={mouseOut}
                            >

                                <div className="all-field-west">

                                    <div className="all-field-west-perfil">

                                        {data.imagePerfilDefault !== undefined &&

                                          <img
                                              className="all-field-west-perfil-img"
                                              alt="perfil"
                                              src={`/imagePerfil/${data.imagePerfilDefault}`}
                                          />
                                        }

                                        <div className="all-field-west-perfil-on">
                                            <div className={`all-field-west-perfil-on-2 ${data.status}`}>
                                                <div className={`all-field-west-perfil-on-3 ${data.status}`}>

                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="all-field-west-info">
                                        <div className="all-field-west-info-names">
                                            <span className="all-field-west-info-name">
                                                {data.name}
                                            </span>
                                            <span className="all-field-west-info-code">
                                                {data.code}
                                            </span>
                                        </div>
                                        <div className="all-field-west-info-message">
                                            {data.status}
                                        </div>
                                    </div>

                                </div>

                                <div className="all-field-east">
                                    <Link
                                        to={`/chat/${data._id}`}
                                        className="all-field-east-option message"
                                    >
                                        <FontAwesomeIcon icon={faCommentAlt} />
                                    </Link>
                                    <div
                                        className="all-field-east-option more"
                                        onClick={fieldEast}
                                        // onMouseOut={() => { setVerify(false) }}
                                        // onMouseOver={() => { setVerify(true) }}
                                    >
                                        <FontAwesomeIcon icon={faEllipsisV} />

                                        <div
                                            className="all-field-east-more"
                                        >

                                            <div className="all-field-east-more-option start">
                                                Start Voice Call
                                            </div>
                                            <div
                                                    onClick={removeFriend}
                                                    className="all-field-east-more-option remove"
                                                    id={`${data._id}#${data.name}`}
                                            >
                                                Remove Friend
                                            </div>

                                        </div>

                                    </div>
                                </div>

                            </div>
                          )
                    }

                    <RemoveFriend user={userRemove}/>
                </div>
                </>
            }
        </div>
  )
}

export default View
