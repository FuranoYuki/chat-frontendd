import React, { useEffect, useState } from 'react'
// style
import './CountConfig.css'
// router
import { Link } from 'react-router-dom'
// api
import api from '../../services/http/api'
// external components
import ConfigAccountProfile from '../../components/configAccountProfile/ConfigAccountProfile'
import ConfigAccountSecurity from '../../components/configAccountSecurity'
import ConfigAccountDelete from '../../components/configAccountDelete'
import LogoutModal from '../../components/logoutModal/LogoutModal'
// fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebookSquare, faTwitter } from '@fortawesome/free-brands-svg-icons'

const CountConfig = () => {
  // react-states
  const [user, setUser] = useState({})

  // react-effects
  useEffect(() => {
    api.post('/user/getUserConfig')
      .then(data => {
        setUser(data.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const logoutAccount = () => {
    document.querySelector('.LogoutModal').style.display = 'flex'
  }

  // jsx
  return (
        <div className="CountConfig">

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
                    <Link
                        to="/"
                        className="config-exist-div-icon"
                    >
                        X
                    </Link>
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
