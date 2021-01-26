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

  // jsx
  return (
        <div className="CountConfig">

            <div className="config-navbar">
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

        </div>
  )
}

export default CountConfig
