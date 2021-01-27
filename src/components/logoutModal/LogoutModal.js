import React from 'react'

// style
import './LogoutModal.css'
// token
import { logout } from '../../services/auth'

const LogoutModal = () => {
  const closeLogoutModal = () => {
    document.querySelector('.LogoutModal').style.display = 'none'
  }
  const logoutAccepted = () => {
    logout()
    window.location.href = '/'
  }

  return (
        <div className="LogoutModal">
            <div className="logoutmodal-main">
                <div className="logoutmodal-body">
                    <div className="logoutmodal-body-header">LOGOUT</div>
                    <div className="logoutmodal-body-text">
                        Are you sure you want log out?
                    </div>
                </div>
                <div className="logoutmodal-buttons">
                    <button
                        className="logoutmodal-button cancel"
                        onClick={closeLogoutModal}
                    >
                        Cancel
                    </button>
                    <button
                        className="logoutmodal-button logout"
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
