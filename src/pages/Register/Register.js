// dependencies
import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'

// style
import './Register.css'
// api
import api from '../../services/http/api'
// set token in localStorage and pass to api header from now on
import { login, isAuthenticated } from '../../services/auth'

const Register = () => {
  const { register, handleSubmit } = useForm()
  const history = useHistory()
  const errorPassword = useRef(null)
  const errorEmail = useRef(null)
  const passwordInput = useRef(null)
  const emailInput = useRef(null)

  useEffect(() => {
    if (isAuthenticated()) {
      history.push('/')
    }
  }, [])

  const formLoginSubmit = async (data) => {
    const { email, password } = data
    const name = email.split('@')[0]

    if (password.length > 6) {
      if (email.length > 5) {
        try {
          const res = await api.post('/user/register', { name, email, password })
          login(res.data.token)
          history.push('/')
        } catch (error) {
          emailExist()
        }
      } else {
        emailEmpty()
      }
    } else {
      passwordError()
    }
  }

  const emailExist = () => {
    errorEmail.current.innerHTML = 'this e-mail is already in use'
    errorEmail.current.style.display = 'flex'

    emailInput.current.style.border = '1px solid   rgb(255, 16, 16)'
  }

  const emailEmpty = () => {
    errorEmail.current.innerHTML = 'this e-mail is already in use'
    errorEmail.current.style.display = 'flex'

    emailInput.current.style.border = '1px solid   rgb(255, 16, 16)'
  }

  const passwordError = () => {
    errorPassword.current.innerHTML = 'The password need to have more than 6 characters !'
    errorPassword.current.style.display = 'flex'

    passwordInput.current.style.border = '1px solid   rgb(255, 16, 16)'
  }

  return (
        <div className="Login">
            <form onSubmit={handleSubmit(formLoginSubmit)} className="login__form">
                <img src='https://discord.com/assets/6debd47ed13483642cf09e832ed0bc1b.png' className="login__form--logo"/>
                <div className="login__form--header">
                    Register
                </div>
                <div className="login__form--inputs">
                    <div ref={emailInput} className="login__form--input-area email-area-input">
                        <div className="login__form__input-area--top">
                            <label className="login__form-label">
                                Email
                            </label>
                            <span ref={errorEmail} className="error--email"></span>
                        </div>
                        <input
                            name="email"
                            className="login__form--input"
                            ref={register}
                        />
                    </div>
                    <div ref={passwordInput} className="login__form--input-area password-area-input">
                        <div className="login__form__input-area--top">
                            <label className="login__form-label">
                                Password
                            </label>
                            <span ref={errorPassword} className="error--password"></span>
                        </div>
                        <input
                        name="password"
                        type="password"
                        className="login__form--input"
                        ref={register}
                    />
                    </div>
                </div>
                <button type="submit" className="login__form--button">
                    Create
                </button>
                <Link style={{ color: 'white' }} to="/login">
                    Already have an account?
                </Link>
            </form>
        </div>
  )
}

export default Register
