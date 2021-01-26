import React, { useState } from 'react'
// style
import './UserList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faCommentAlt } from '@fortawesome/free-solid-svg-icons'
// router Link
import { Link } from 'react-router-dom'
// removeFriend component
import RemoveFriend from '../removeFriend/RemoveFriend'

const UserList = ({ friends, online }) => {
  const [userRemove, setUserRemove] = useState('')

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

  const openField = (event) => {
    const obj = event.currentTarget.lastElementChild
    obj.style.display === 'flex' ? obj.style.display = 'none' : obj.style.display = 'flex'
  }

  //   const closeField = (data) => {

  //   }

  function removeFriend (event) {
    setUserRemove(event.target.id)
    document.querySelector('.RemoveFriend').style.display = 'flex'
  }

  return (
    <>
    {friends !== undefined &&
        <div className="all-view">
            {online
              ? <div className="all-view-header">
                    ONLINE - {friends.filter(data => data.status !== 'Offline').length}
                </div>
              : <div className="all-view-header">
                    ALL FRIENDS - {friends.length}
                </div>
            }

            <div className="all-view-list">

            {friends
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
                            onClick={openField}
                            id={data._id}
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
        </div>
    }
    </>
  )
}

export default UserList
