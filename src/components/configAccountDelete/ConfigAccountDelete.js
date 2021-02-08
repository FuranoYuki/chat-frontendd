// react
import React, { useRef } from 'react'
// style
import styles from './ConfigAccountDelete.module.css'
// form
import { useForm } from 'react-hook-form'
// api
import api from '../../services/http/api'
// token
import { logout } from '../../services/auth'
// router
import { useHistory } from 'react-router-dom'

const ConfigAccountDelete = () => {
  const history = useHistory()
  const configModal = useRef(null)
  const incorrectPassword = useRef(null)
  const { register, handleSubmit } = useForm()

  const showModal = () => {
    configModal.current.style.display = 'flex'
  }

  const hideModal = () => {
    configModal.current.style.display = 'none'
  }

  const verifyModal = (event) => {
    if (event.target === event.currentTarget) {
      hideModal()
    }
  }

  const deleteAccount = (data) => {
    const { password } = data

    if (password.length < 6) {
      incorrectPassword.current.style.display = 'inline'
    } else {
      incorrectPassword.current.style.display = 'none'
    }

    if (password.length > -6) {
      api.post('/user/deleteAccount', { password })
        .then(() => {
          logout()
          history.push('/login')
        })
        .catch(error => {
          if (error.response.data === 'failed at deleteAccount, password incorrect') {
            incorrectPassword.current.style.display = 'inline'
          }
        })
    }
  }

  return (
    <>
        <div className={styles.config_accDel}>
            <div className={styles.accDel_header}>
                ACCOUNT REMOVAL
            </div>
            <p>
                Disabling your account means you can recover
                it at any time after taking this action.
            </p>
            <div className={styles.accDel_btns}>
                <button
                    onClick={showModal}
                    className={styles.btns_Disable}
                >
                    Disable Account
                </button>
                <button
                    onClick={showModal}
                    className={styles.btns_Delete}
                >
                    Delete Account
                </button>
            </div>
        </div>

        <div
            className={styles.configDel_modal}
            onClick={verifyModal}
            ref={configModal}
        >
            <form
                onSubmit={handleSubmit(deleteAccount)}
                className={styles.modal_form}
            >
                <div className={styles.form_body}>
                    <div className={styles.body_header}>
                        DELETE ACCOUNT
                    </div>
                    <p className={styles.body_text}>
                        Are you sure that you want to delete your account?
                        This will immediately log you out of your account and
                        you will not be able to log in again.
                    </p>
                    <div className={styles.body_field}>
                        <label>
                            password
                            <span className={styles.password_incorrect} ref={incorrectPassword}>
                                password incorrect
                            </span>
                        </label>
                        <input
                            className={styles.field_input}
                            name="password"
                            type="password"
                            ref={register}
                        />
                    </div>
                </div>
                <div className={styles.form_buttons}>
                    <button
                        onClick={hideModal}
                        className={`${styles.form_button} ${styles.cancel}`}
                        type="button"
                    >
                        Cancel
                    </button>
                    <button
                        className={`${styles.form_button} ${styles.delete}`}
                        type="submit"
                    >
                        Delete Account
                    </button>
                </div>
            </form>
        </div>
    </>
  )
}

export default ConfigAccountDelete
