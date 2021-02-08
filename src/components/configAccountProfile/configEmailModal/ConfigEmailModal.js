import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
// styles
import styles from './ConfigEmailModal.module.css'
// form
import { useForm } from 'react-hook-form'
// api
import api from '../../../services/http/api'
// error
import ErrorHandler from '../../errorHandler/ErrorHandler'
// action
import userUpdate from '../../../store/actions/userUpdate'

const ConfigEmailModal = () => {
  const modal = useRef(null)
  const dispatch = useDispatch()
  const emailWarningRef = useRef(null)
  const passwordWarningRef = useRef(null)
  const { register, handleSubmit } = useForm()

  const changeName = async (data) => {
    const { email, password } = data

    if (email.length === 0) {
      showEmailWarning()
    }

    if (password.length === 0) {
      showPasswordWarning()
    }

    if (email.length > 0 && password.length > 0) {
      try {
        removeWarnings()
        await api.post('/user/changeEmail', { email, password })
        dispatch(userUpdate({ email: true }))
        closeModal()
      } catch (error) {
        error.response.data.error ? verifyError(error) : ErrorHandler(error)
      }
    }
  }

  const verifyError = (error) => {
    if (error.response.data.error !== 'wrong password') {
      showEmailWarning()
      emailWarningRef.current.innerHTML = error.response.data.error
    } else {
      showPasswordWarning()
    }
  }

  const showPasswordWarning = () => {
    passwordWarningRef.current.style.display = 'flex'
  }

  const showEmailWarning = () => {
    emailWarningRef.current.style.display = 'flex'
  }

  const removeWarnings = () => {
    emailWarningRef.current.style.display = 'none'
    passwordWarningRef.current.style.display = 'none'
  }

  const closeModal = () => {
    modal.current.style.display = 'none'
  }

  const clickOutModal = (event) => {
    if (event.target === event.currentTarget) { closeModal() }
  }
  return (
    <div className={`${styles.configemailmodal} configemailmodal`} ref={modal} onClick={clickOutModal}>
        <form onSubmit={handleSubmit(changeName)} className={styles.user_modal}>
            <div className={styles.modal_body}>
                <div className={styles.body_header}>
                    Enter an email address
                </div>
                <div className={styles.body_text}>
                    Enter an email address and your existing password.
                </div>
                <div className={styles.body_form}>
                   <div className={styles.form_input}>
                        <div className={styles.input_label}>
                            EMAIL
                            <span className={styles.warning_username} ref={emailWarningRef}>
                              *e-mail must have at least 1 character*
                            </span>
                        </div>
                        <input
                            name='email'
                            autoComplete="off"
                            ref={register}
                            className={`${styles.input_name} email`}
                        />
                   </div>
                   <div className={styles.form_input}>
                        <div className={styles.input_label}>
                            CURRENT PASSWORD
                            <span className={styles.warning_password} ref={passwordWarningRef}>
                              *password incorrect*
                            </span>
                        </div>
                        <input
                            name='password'
                            autoComplete='off'
                            ref={register}
                            type="password"
                            className={`${styles.input_name} user_password`}
                        />
                   </div>
                </div>
            </div>
            <div className={styles.body_bottom}>
                <button
                  className={styles.bottom_cancel}
                  onClick={closeModal}
                  type="button"
                >
                  Cancel
                </button>
                <button className={styles.bottom_done}>Done</button>
            </div>
        </form>
    </div>
  )
}

export default ConfigEmailModal
