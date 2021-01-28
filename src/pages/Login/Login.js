// dependencies
import React, { useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
// styles
import './Login.css'
// set token in localStorage and pass authorization to api
import { login, isAuthenticated } from '../../services/auth'
// base api withou authorization
import api from '../../services/http/api'

const Login = () => {
  const history = useHistory()
  const emailWarning = useRef(null)
  const passwordWarning = useRef(null)
  const { register, handleSubmit } = useForm()

  const handleLoginForm = async (data) => {
    const { email, password } = data
    if (email && password) {
      try {
        const res = await api.post('/user/login', { email, password })
        login(res.data.token)
        history.push('/')
      } catch (error) {
        handleError(error)
      }
    } else {
      verifyEmailandPassword(email)
    }
  }

  const verifyEmailandPassword = (email) => {
    if (!email) {
      emailWarning.current.style.display = 'flex'
      passwordWarning.current.style.display = 'none'
    } else {
      passwordWarning.current.style.display = 'flex'
      emailWarning.current.style.display = 'none'
    }
  }

  const handleError = (error) => {
    if (error.response.data.indexOf('email') !== -1) {
      emailWarning.current.style.display = 'flex'
    }
    if (error.response.data.indexOf('password') !== -1) {
      passwordWarning.current.style.display = 'flex'
    }
  }

  useEffect(() => {
    if (isAuthenticated()) {
      history.push('/')
    }
  }, [])

  return (
        <div className="register">
            <form onSubmit={handleSubmit(handleLoginForm)} className="register__form">
                <img className="register__form--brand" src='https://discord.com/assets/6debd47ed13483642cf09e832ed0bc1b.png' alt="funny brand" />
                <div className="register__form--inputs">
                    <div className="reguster__form--inputs-info">
                        <span>Email</span>
                        <p ref={emailWarning} className="register__email-warning">
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
                        <p ref={passwordWarning} className="register__password-warning">
                            this password is wrong
                        </p>
                    </div>
                    <input
                        className="register__Form-input-password"
                        placeholder="type your password"
                        type="password"
                        name="password"
                        ref={register}
                    />
                </div>

                <button className="register__form--button">
                    Log In
                </button>

                <Link to="/register" className="register__form--make-account">
                    Click here to create an account!
                </Link>
            </form>
        </div>
  )
}

export default Login
