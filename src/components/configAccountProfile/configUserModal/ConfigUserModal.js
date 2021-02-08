import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
// styles
import styles from './ConfigUserModal.module.css'
// form
import { useForm } from 'react-hook-form'
// api
import api from '../../../services/http/api'
// error
import ErrorHandler from '../../errorHandler/ErrorHandler'
// action
import userUpdate from '../../../store/actions/userUpdate'

const ConfigUserModal = () => {
  const modal = useRef(null)
  const dispatch = useDispatch()
  const userWarningRef = useRef(null)
  const passwordWarningRef = useRef(null)
  const { register, handleSubmit } = useForm()

  const changeName = async (data) => {
    const { name, password } = data
    if (name.length === 0) {
      userWarning()
    }

    if (password.length === 0) {
      passwordWarning()
    }

    if (name.length > 0 && password.length > 0) {
      try {
        removeWarnings()
        await api.post('/user/changeName', { name, password })
        dispatch(userUpdate({ name: true }))
        closeModal()
      } catch (error) {
        error.response.data.error ? verifyError(error) : ErrorHandler(error)
      }
    }
  }

  const verifyError = (error) => {
    if (error.response.data.error !== 'wrong password') {
      userWarning()
      userWarningRef.current.innerHTML = error.response.data.error
    } else {
      passwordWarning()
    }
  }

  const removeWarnings = () => {
    userWarningRef.current.style.display = 'none'
    passwordWarningRef.current.style.display = 'none'
  }

  const userWarning = () => {
    userWarningRef.current.style.display = 'flex'
  }

  const passwordWarning = () => {
    passwordWarningRef.current.style.display = 'flex'
  }

  const closeModal = () => {
    removeWarnings()
    modal.current.style.display = 'none'
  }

  const clickOutModal = (event) => {
    if (event.target === event.currentTarget) { closeModal() }
  }

  return (
    <div className={`${styles.configusermodal} configusermodal`} ref={modal} onClick={clickOutModal}>
        <form onSubmit={handleSubmit(changeName)} className={styles.user_modal}>
            <div className={styles.modal_body}>
                <div className={styles.body_header}>
                    Change your username
                </div>
                <div className={styles.body_text}>
                    Enter a new username and your existing password.
                </div>
                <div className={styles.body_form}>
                   <div className={styles.form_input}>
                        <div className={styles.input_label}>
                            USERNAME
                            <span className={styles.warning_username} ref={userWarningRef}>
                              *name must have at least 1 character*
                            </span>
                        </div>
                        <input
                            name='name'
                            autoComplete="off"
                            ref={register}
                            className={`${styles.input_name} name`}
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
                            className={`${styles.input_name} email_password`}
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

export default ConfigUserModal
