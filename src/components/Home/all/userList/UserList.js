import React, { useState } from 'react'
// style
import styles from './UserList.module.css'
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

  const removeFriend = (event) => {
    setUserRemove(event.target.id)
    document.querySelector('.RemoveFriend').style.display = 'flex'
  }

  return (
    <>
    {friends !== undefined &&
        <div className={styles.all_view}>
            {online
              ? <div className={styles.view_header}>
                    ONLINE &#9866; {Object.values(friends).filter(data => data.status !== 'Offline').length}
                </div>
              : <div className={styles.view_header}>
                    ALL FRIENDS &#9866; {friends.length}
                </div>
            }

            <div className={styles.view_list}>

            {Object.values(friends)
              .filter(data => online ? data.status !== 'Offline' : data)
              .map(data =>

                <div
                    key={data._id}
                    className={styles.list_field}
                    onMouseOver={mouseOver}
                    onMouseOut={mouseOut}
                >
                    <Link to={`/chat/${data._id}`} className={styles.field_west}>

                        <div className={styles.west_perfil}>

                            <img
                                className={styles.perfil_img}
                                alt="perfil"
                                src={data.imagePerfil === undefined ? data.imagePerfilDefault : data.imagePerfil.path}
                            />

                            <div className={styles.perfil_on}>
                                <div className={`${styles.on_2} ${data.status}`}>
                                    <div className={`${styles.on_3} ${data.status}`}>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className={styles.west_info}>
                            <div className={styles.info_names}>
                                <span className={styles.info_name}>
                                    {data.name}
                                </span>
                                <span className={styles.info_code}>
                                    {data.code}
                                </span>
                            </div>
                            <div className={styles.info_message}>
                                {data.status}
                            </div>
                        </div>

                    </Link>

                    <div className={styles.field_east}>
                        <Link
                            to={`/chat/${data._id}`}
                            className={`${styles.east_option} message`}
                        >
                            <FontAwesomeIcon icon={faCommentAlt} />
                        </Link>
                        <div
                            className={`${styles.east_option} more`}
                            onClick={openField}
                            id={data._id}
                        >
                            <FontAwesomeIcon icon={faEllipsisV} />

                            <div
                                className={styles.more}
                            >

                            <div className={`${styles.more_option} ${styles.start}`}>
                                Start Voice Call
                            </div>
                            <div
                                onClick={removeFriend}
                                className={`${styles.more_option} ${styles.remove}`}
                                id={`${data._id}#${data.name + '' + data.code}`}
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
