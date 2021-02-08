import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// style
import styles from './CountConfig.module.css'
// api
import api from '../../services/http/api'
// errorHandle
import ErrorHandler from '../errorHandler/ErrorHandler'
// external components
import ConfigAccountProfile from '../configAccountProfile/ConfigAccountProfile'
import ConfigAccountSecurity from '../configAccountSecurity/ConfigAccountSecurity'
import ConfigAccountDelete from '../configAccountDelete/ConfigAccountDelete'
import LogoutModal from '../logoutModal/LogoutModal'
// fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebookSquare, faTwitter } from '@fortawesome/free-brands-svg-icons'
// action
import userUpdateAction from '../../store/actions/userUpdate'

const CountConfig = () => {
  const config = useRef(null)
  const dispatch = useDispatch()
  const [user, setUser] = useState({})
  const userUpdate = useSelector(state => state.userUpdate)

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
    if (userUpdate.image || userUpdate.name || userUpdate.email) {
      getUserConfig()
      dispatch(userUpdateAction({ image: false, name: false, email: false }))
    }
  }, [userUpdate])

  useEffect(() => {
    getUserConfig()
  }, [])

  return (
    <div ref={config} className={`${styles.countConfig} CountConfig`}>

      <div className={styles.config_navbar}>
        <div
          className={styles.navbar_logout}
          onClick={logoutAccount}
        >
          Log Out
        </div>
        <div className="config-navbar-contact">
          <div className={styles.navbar_social}>
            <FontAwesomeIcon icon={faTwitter} />
            <FontAwesomeIcon icon={faFacebookSquare} />
            <FontAwesomeIcon icon={faInstagram} />
          </div>
          <div className={styles.navbar_createdBy}>
            <div className="createdBy">
              <span>By:</span> Furano Yuki Prando
            </div>
            <div className="createdEmail">
              <span>Email:</span> matheus.a.prando@gmail.com
            </div>
          </div>
        </div>
      </div>

      <div className={styles.config_main}>
        <ConfigAccountProfile user={user} />
        <ConfigAccountSecurity />
        <ConfigAccountDelete user={user} />
      </div>

      <div className={styles.config_exit}>
        <div className={styles.exit_div}>
          <div
            className={styles.div_icon}
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
