import React, { useRef } from 'react'

// style
import styles from './LogoutModal.module.css'
// token
import { logout } from '../../services/auth'

const LogoutModal = () => {
  const modal = useRef(null)

  const closeLogoutModal = () => {
    modal.current.style.display = 'none'
  }
  const logoutAccepted = () => {
    logout()
    window.location.href = '/'
  }

  return (
    <div className={`${styles.logoutmodal} LogoutModal`} ref={modal}>
        <div className={styles.logoutmodal_main}>
            <div className={styles.logoutmodal_body}>
                <div className={styles.body_header}>LOGOUT</div>
                <div className={styles.body_text}>
                    Are you sure you want log out?
                </div>
            </div>
            <div className={styles.logoutmodal_buttons}>
                <button
                    className={`${styles.logoutmodal_button} ${styles.cancel}`}
                    onClick={closeLogoutModal}
                >
                    Cancel
                </button>
                <button
                    className={`${styles.logoutmodal_button} ${styles.logout}`}
                    onClick={logoutAccepted}
                >
                    Log Out
                </button>
            </div>
        </div>
    </div>
  )
}

export default LogoutModal
