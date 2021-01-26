// react
import React from 'react'
// fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
// form
import { useForm } from 'react-hook-form'
// api
import api from '../../services/http/api'
// style
import './styles.css'

const ConfigAccountSecurity = () => {
  // form
  const { register, handleSubmit } = useForm()

  // functions
  const modalChangePassword = () => {
    document.querySelector('.modal-changePassword').style.display = 'flex'
  }

  const closeModal = () => {
    document.querySelector('.modal-changePassword').style.display = 'none'
  }

  const verifyModal = (event) => {
    if (event.target === event.currentTarget) {
      closeModal()
    }
  }

  const changePassword = (data) => {
    const { password, newPassword } = data

    if (password.length < 6) {
      document.querySelector('.incorrect-pass').style.display = 'inline'
    } else {
      document.querySelector('.incorrect-pass').style.display = 'none'
    }

    if (newPassword.length < 6) {
      document.querySelector('.atLeast-4').style.display = 'inline'
    } else {
      document.querySelector('.atLeast-4').style.display = 'none'
    }

    if (password.length >= 6 && newPassword.length >= 6) {
      api.post('/user/changePassword', {
        password,
        newPassword
      })
        .then(() => {
          closeModal()
        })
        .catch(error => {
          if (error.response.data === 'failed at changePassword, password incorrect') {
            document.querySelector('.incorrect-pass').style.display = 'inline'
          }
        })
    }
  }

  return (
        <>
            <div className="config-accSec">
                <div className="config-accSec-left">
                    <div className="config-accSec-left-header">
                        Password and Authentication
                    </div>
                    <button
                        className="config-accSec-left-button"
                        onClick={modalChangePassword}
                    >
                            Change Password
                    </button>
                    <div className="config-accSec-left-twoF">
                        <div className="config-accSec-left-twoF-header">
                            TWO-FACTOR AUTHENTICATION
                        </div>
                        <p>
                            You must verify your account before you can enable two-factor authentication
                        </p>
                        <button className="config-accSec-left-twoF-button">
                            Enabe Two-Factor Auth
                        </button>
                    </div>
                </div>
                <div className="config-accSec-right">
                    <img
                        src="https://discord.com/assets/cdea41ede63f61153e4a3c0531fa3873.svg"
                        atl="change your password"
                        className="config-accSec-right-img"
                    />
                </div>
            </div>

            <div
                className="modal-changePassword"
                onClick={verifyModal}
            >
                <form
                    onSubmit={handleSubmit(changePassword)}
                    className="changePassword-body"
                >
                    <div className="changePassword-body-main">
                        <div
                            className="changePassword-body-main-exit"
                            onClick={closeModal}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </div>
                        <div className="changePassword-body-main-header">
                            Change your password
                        </div>
                        <div className="changePassword-body-main-subHeader">
                            Enter your current password and a new password.
                        </div>
                        <div className="changePassword-body-main-field">
                            <label htmlFor="changePassword-body-main-field-password">
                                CURRENT PASSWORD
                                <span className="incorrect-pass">
                                    incorrect password
                                </span>
                            </label>
                            <input
                                id="changePassword-body-main-field-password"
                                className="changePassword-body-main-field-password"
                                name="password"
                                type="password"
                                ref={register}
                            />
                        </div>
                        <div className="changePassword-body-main-field">
                            <label htmlFor="changePassword-body-main-field-newPassword">
                                NEW PASSWORD
                                <span className="atLeast-4">
                                    the password must have at least 4 characters!
                                </span>
                            </label>
                            <input
                                id="changePassword-body-main-field-newPassword"
                                className="changePassword-body-main-field-password"
                                name="newPassword"
                                type="password"
                                ref={register}
                            />
                        </div>
                    </div>
                    <div className="changePassword-body-buttons">
                        <button
                            className="changePassword-body-button cancel"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                        <button
                            className="changePassword-body-button done"
                            type="submit"
                        >
                            Done
                        </button>
                    </div>
                </form>
            </div>
        </>
  )
}

export default ConfigAccountSecurity
