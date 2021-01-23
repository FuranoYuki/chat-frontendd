// react
import React from 'react'
// fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faImage } from '@fortawesome/free-solid-svg-icons'
// style
import './ConfigAccountProfile.css'
// form
import { useForm } from 'react-hook-form'
// api
import api from '../../services/http/api'

const ConfigAccountProfile = ({ user }) => {
  // form
  const { register, handleSubmit } = useForm()

  // functions
  const openFile = () => {
    document.querySelector('.accInfo-img-input').click()
  }

  const closeInput = (event) => {
    if (event.target.value.length) {
      document.querySelector('.accInfo-img-button').click()
    }
  }

  const imgForm = async (data) => {
    const image = new FormData()
    image.append('file', data.img[0])

    api.post('/user/changeImagePerfil', image)
  }

  return (
        <div className="config-main-accInfo">

            <div className="accInfo-header">
                MY ACCOUNT
            </div>

            <div className="accInfo-main">
                <div className="accInfo-main-top">

                    <div className="accInfo-main-top-left">
                        <form
                            className="accInfo-main-top-left-imgDiv"
                            onClick={openFile}
                            onSubmit={handleSubmit(imgForm)}
                            encType="multipart/form-data"
                        >

                            {
                                user.imagePerfil === undefined

                                  ? <img
                                        src={`/imagePerfil/${user.imagePerfilDefault}`}
                                        alt="perfil image"
                                    />

                                  : <img
                                        src={user.imagePerfil.path}
                                        alt="perfil image"
                                    />
                            }

                            <div className="accInfo-main-top-left-imgDiv-icon">
                                <input
                                    name="img"
                                    type="file"
                                    style={{ display: 'none' }}
                                    className="accInfo-img-input"
                                    onChange={closeInput}
                                    ref={register}
                                />
                                <button
                                    className="accInfo-img-button"
                                    type="submit"
                                    style={{ display: 'none' }}
                                >
                                </button>
                                <FontAwesomeIcon icon={faImage} />
                            </div>
                        </form>
                        <div className="accInfo-main-top-left-name">
                            {user.name}
                        </div>
                    </div>

                    <div className="accInfo-main-top-right">
                        <FontAwesomeIcon icon={faEllipsisH} />
                    </div>

                </div>
                <div className="accInfo-main-bottom">

                    <div className="accInfo-main-bottom-li">
                        <div className="accInfo-main-bot-left">
                            <div className="acInfo-main-bot-left-top">
                                username
                            </div>
                            <div className="accInfo-main-bot-left-bot">
                                {user.name}
                                <span>${user.code}</span>
                            </div>
                        </div>
                        <div className="accInfo-main-bot-right">
                            Edit
                        </div>
                    </div>

                    <div className="accInfo-main-bottom-li">
                        <div className="accInfo-main-bot-left">
                            <div className="acInfo-main-bot-left-top">
                                EMAIL
                            </div>
                            <div className="accInfo-main-bot-left-bot">
                                {user.email}
                            </div>
                        </div>
                        <div className="accInfo-main-bot-right">
                            Edit
                        </div>
                    </div>

                    <div className="accInfo-main-bottom-li">
                        <div className="accInfo-main-bot-left">
                            <div className="acInfo-main-bot-left-top">
                                PHONE NUMBER
                            </div>
                            <div className="accInfo-main-bot-left-bot">
                                You haven&apos;t added a phone number yet
                            </div>
                        </div>
                        <div className="accInfo-main-bot-right">
                            Edit
                        </div>
                    </div>

                </div>
            </div>

        </div>
  )
}

export default ConfigAccountProfile
