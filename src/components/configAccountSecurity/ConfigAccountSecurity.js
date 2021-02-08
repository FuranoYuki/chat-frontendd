// react
import React, { useRef } from 'react'
// fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
// form
import { useForm } from 'react-hook-form'
// api
import api from '../../services/http/api'
// style
import styles from './ConfigAccountSecurity.module.css'
// error
import ErroHandler from '../errorHandler/ErrorHandler'

const ConfigAccountSecurity = () => {
  const warning = useRef(null)
  const incorrectPassword = useRef(null)
  const changePasswordModal = useRef(null)
  const { register, handleSubmit } = useForm()

  const modalChangePassword = () => {
    changePasswordModal.current.style.display = 'flex'
  }

  const closeModal = () => {
    changePasswordModal.current.style.display = 'none'
  }

  const verifyModal = (event) => {
    if (event.target === event.currentTarget) {
      closeModal()
    }
  }

  const changePassword = async (data) => {
    const { password, newPassword } = data

    if (password.length < 6) {
      incorrectPassword.current.style.display = 'inline'
    } else {
      incorrectPassword.current.style.display = 'none'
    }

    if (newPassword.length < 6) {
      warning.current.style.display = 'inline'
    } else {
      warning.current.style.display = 'none'
    }

    if (password.length >= 6 && newPassword.length >= 6) {
      try {
        await api.post('/user/changePassword', { password, newPassword })
        closeModal()
      } catch (error) {
        if (error.response.data === 'failed at changePassword, password incorrect') {
          incorrectPassword.current.style.display = 'inline'
        } else {
          ErroHandler(error)
        }
      }
    }
  }

  return (
    <>
        <div className={styles.config_accSec}>
            <div className={styles.accSec_left}>
                <div className={styles.left_header}>
                    Password and Authentication
                </div>
                <button
                    className={styles.left_button}
                    onClick={modalChangePassword}
                >
                        Change Password
                </button>
                <div className={styles.left_twoF}>
                    <div className={styles.twoF_header}>
                        TWO-FACTOR AUTHENTICATION
                    </div>
                    <p>
                        You must verify your account before you can enable two-factor authentication
                    </p>
                    <button className={styles.twoF_button}>
                        Enabe Two-Factor Auth
                    </button>
                </div>
            </div>
            <div className={styles.accSec_right}>
                <img
                    src="https://discord.com/assets/cdea41ede63f61153e4a3c0531fa3873.svg"
                    atl="change your password"
                    className={styles.right_img}
                />
            </div>
        </div>

        <div
            className={styles.modal_changePassword}
            onClick={verifyModal}
            ref={changePasswordModal}
        >
            <form
                onSubmit={handleSubmit(changePassword)}
                className={styles.changePassword_body}
            >
                <div className={styles.body_main}>
                    <div
                        className={styles.main_exit}
                        onClick={closeModal}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                    <div className={styles.main_header}>
                        Change your password
                    </div>
                    <div className={styles.main_subHeader}>
                        Enter your current password and a new password.
                    </div>
                    <div className={styles.main_field}>
                        <label htmlFor="changePassword-body-main-field-password">
                            CURRENT PASSWORD
                            <span className={styles.incorrect_pass} ref={incorrectPassword}>
                                incorrect password
                            </span>
                        </label>
                        <input
                            id="changePassword-body-main-field-password"
                            className={styles.field_password}
                            name="password"
                            type="password"
                            ref={register}
                        />
                    </div>
                    <div className={styles.main_field}>
                        <label htmlFor="changePassword-body-main-field-newPassword">
                            NEW PASSWORD
                            <span className="atLeast-4" ref={warning}>
                                the password must have at least 4 characters!
                            </span>
                        </label>
                        <input
                            id="changePassword-body-main-field-newPassword"
                            className={styles.field_password}
                            name="newPassword"
                            type="password"
                            ref={register}
                        />
                    </div>
                </div>
                <div className={styles.body_buttons}>
                    <button
                        className={`${styles.body_button} ${styles.cancel}`}
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button
                        className={`${styles.body_button} ${styles.done}`}
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
