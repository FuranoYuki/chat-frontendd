import React, { useEffect, useState, useRef } from 'react'
// style
import './CountConfig.css'
// api
import api from '../../services/http/api'
// errorHandle
import ErrorHandler from '../errorHandler/ErrorHandler'

// external components
import ConfigAccountProfile from '../configAccountProfile/ConfigAccountProfile'
import ConfigAccountSecurity from '../configAccountSecurity'
import ConfigAccountDelete from '../configAccountDelete'
import LogoutModal from '../logoutModal/LogoutModal'
// fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebookSquare, faTwitter } from '@fortawesome/free-brands-svg-icons'

const CountConfig = () => {
  const config = useRef(null)
  const [user, setUser] = useState({})

  const closeConfig = () => {
    config.current.style.display = 'none'
  }

  const logoutAccount = () => {
    document.querySelector('.LogoutModal').style.display = 'flex'
  }

  const getUserConfig = async () => {
    try {
      const res = await api.post('/user/getUserConfig')
      setUser(res.data)
    } catch (error) {
      ErrorHandler(error)
    }
  }

  useEffect(() => {
    getUserConfig()
  }, [])

  // jsx
  return (
        <div ref={config} className="CountConfig">

            <div className="config-navbar">
              <div
                className="config-navbar-logout"
                onClick={logoutAccount}
              >
                Log Out
              </div>
              <div className="config-navbar-contact">
                <div className="config-navbar-social">
                  <FontAwesomeIcon icon={faTwitter} />
                  <FontAwesomeIcon icon={faFacebookSquare} />
                  <FontAwesomeIcon icon={faInstagram} />
                </div>
                <div className="config-navbar-createdBy">
                  <div className="createdBy">
                    <span>By:</span> Furano Yuki Prando
                  </div>
                  <div className="createdEmail">
                    <span>Email:</span> matheus.a.prando@gmail.com
                  </div>
                </div>
              </div>
            </div>

            <div className="config-main">
                <ConfigAccountProfile user={user} />
                <ConfigAccountSecurity />
                <ConfigAccountDelete user={user} />
            </div>

            <div className="config-exit">
                <div className="config-exit-div">
                    <div
                        className="config-exist-div-icon"
                        onClick={closeConfig}
                    >
                        X
                    </div>
                    <div className="config-exist-div-text">
                        Esc
                    </div>
                </div>
            </div>

          <LogoutModal/>
        </div>
  )
}

export default CountConfig
