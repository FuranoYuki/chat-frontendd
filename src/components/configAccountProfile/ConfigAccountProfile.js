// react
import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
// fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faImage } from '@fortawesome/free-solid-svg-icons'
// style
import styles from './ConfigAccountProfile.module.css'
// api
import api from '../../services/http/api'
// error
import ErrorHandler from '../errorHandler/ErrorHandler'
// action
import userUpdate from '../../store/actions/userUpdate'
// components
import ConfigUserModal from './configUserModal/ConfigUserModal'
import ConfigEmailModal from './configEmailModal/ConfigEmailModal'

const ConfigAccountProfile = ({ user }) => {
  const avatar = useRef(null)
  const imageRef = useRef(null)
  const imgInput = useRef(null)
  const imgButton = useRef(null)
  const dispatch = useDispatch()

  const openUserModal = () => {
    document.querySelector('.configusermodal').style.display = 'flex'
    document.querySelector('.name').value = user.name
    document.querySelector('.user_password').value = ''
  }

  const openEmailModal = () => {
    document.querySelector('.configemailmodal').style.display = 'flex'
    document.querySelector('.email').value = user.email
    document.querySelector('.email_password').value = ''
  }

  const openFileInput = () => {
    imgInput.current.click()
  }

  const closeFileInput = (event) => {
    if (event.target.value.length) {
      imgButton.current.click()
    }
  }

  const avatarMouseOver = () => {
    avatar.current.style.display = 'flex'
  }

  const avatarMouseOut = () => {
    avatar.current.style.display = 'none'
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const image = new FormData()
    image.append('file', imgInput.current.files[0])

    api.post('/user/changeImagePerfil', image, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => {
        setTimeout(() => {
          dispatch(userUpdate({ image: true }))
        }, 2000)
      })
      .catch(error => {
        ErrorHandler(error)
      })
  }

  return (
    <div className={styles.main_accInfo}>

        <div className={styles.accInfo_header}>
            MY ACCOUNT
        </div>

        <div className={styles.accInfo_main}>
            <div className={styles.main_top}>

                <div className={styles.top_left}>
                    <form
                        className={styles.left_imgDiv}
                        onClick={openFileInput}
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        onMouseOver={avatarMouseOver}
                        onMouseOut={avatarMouseOut}
                    >
                        <div className={styles.avatar_over} ref={avatar}>
                            CHANGE<br/>AVATAR
                        </div>

                        <img
                            alt='perfil'
                            src={user.imagePerfil === undefined ? user.imagePerfilDefault : user.imagePerfil.path}
                            ref={imageRef}
                        />

                        <div className={styles.imgDiv_icon}>
                            <input
                                name="img"
                                type="file"
                                style={{ display: 'none' }}
                                className="accInfo-img-input"
                                onChange={closeFileInput}
                                ref={imgInput}
                            />
                            <button
                                className="accInfo-img-button"
                                type="submit"
                                style={{ display: 'none' }}
                                ref={imgButton}
                            >
                            </button>
                            <FontAwesomeIcon icon={faImage} />
                        </div>
                    </form>
                    <div className={styles.left_name}>
                        {user.name}
                        <span>{user.code}</span>
                    </div>
                </div>

                <div className={styles.top_right}>
                    <FontAwesomeIcon icon={faEllipsisH} />
                </div>

            </div>
            <div className={styles.main_bottom}>

                <div className={styles.bottom_li}>
                    <div className="accInfo-main-bot-left">
                        <div className={styles.left_top}>
                            USERNAME
                        </div>
                        <div className={styles.left_bot}>
                            {user.name}
                            <span>{user.code}</span>
                        </div>
                    </div>
                    <div className={styles.bot_right} onClick={openUserModal}>
                        Edit
                    </div>
                </div>

                <div className={styles.bottom_li}>
                    <div className="accInfo-main-bot-left">
                        <div className={styles.left_top}>
                            EMAIL
                        </div>
                        <div className={styles.left_bot}>
                            {user.email}
                        </div>
                    </div>
                    <div className={styles.bot_right} onClick={openEmailModal}>
                        Edit
                    </div>
                </div>

                <div className={styles.bottom_li}>
                    <div className="accInfo-main-bot-left">
                        <div className={styles.left_top}>
                            PHONE NUMBER
                        </div>
                        <div className={styles.left_bot}>
                            You haven&apos;t added a phone number yet
                        </div>
                    </div>
                    <div className={styles.bot_right}>
                        Add
                    </div>
                </div>
            </div>
        </div>
        <ConfigUserModal />
        <ConfigEmailModal />
    </div>
  )
}

export default ConfigAccountProfile
