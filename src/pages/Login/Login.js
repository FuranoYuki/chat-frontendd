// dependencies
import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

// external files
import './Login.css'
import brand from '../../assets/logo_transparent.png'
import { login, isAuthenticated } from '../../services/auth'
import api from '../../services/http/api'

const Login = () => {
  const { register, handleSubmit } = useForm()
  const history = useHistory()

  useEffect(() => {
    if (isAuthenticated()) {
      history.push('/')
    }
  }, [])

  const handleLoginForm = (data) => {
    const { email, password } = data

    if (email && password) {
      api.post('/user/login', { email, password })
        .then(response => {
          login(response.data.token)
          history.push('/')
        })
        .catch(error => {
          if (error.response.data.indexOf('email') !== -1) {
            document.querySelector('.register__email-warning').style.display = 'flex'
          }
          if (error.response.data.indexOf('password') !== -1) {
            document.querySelector('.register__password-warning').style.display = 'flex'
          }
        })
    } else {
      if (!email) {
        document.querySelector('.register__email-warning').style.display = 'flex'
        document.querySelector('.register__password-warning').style.display = 'none'
      } else {
        document.querySelector('.register__password-warning').style.display = 'flex'
        document.querySelector('.register__email-warning').style.display = 'none'
      }
    }
  }

  return (
        <div className="register">
            <form onSubmit={handleSubmit(handleLoginForm)} className="register__form">
                <img className="register__form--brand" src={brand} alt="funny brand" />
                <h1 className="register__form--header">
                    Log in on Funny
                </h1>
                <div className="register__form--inputs">
                    <div className="reguster__form--inputs-info">
                        <span>Email</span>
                        <p className="register__email-warning">
                            this e-mail isn&apos;t register in our database
                        </p>
                    </div>
                    <input
                        className="register__form-input-email"
                        placeholder="type your e-mail"
                        name="email"
                        ref={register}
                    />
                </div>
                <div className="register__form--inputs">
                <div className="reguster__form--inputs-info">
                        <span>Password</span>
                        <p className="register__password-warning">
                            this password is wrong
                        </p>
                    </div>
                    <input
                        className="register__Form-input-password"
                        placeholder="type your password"
                        name="password"
                        ref={register}
                    />
                </div>

                <button className="register__form--button">
                    Log in
                </button>

                <Link to="/register" className="register__form--make-account">
                    Click here to create an account!
                </Link>
            </form>
        </div>
  )
}

export default Login
