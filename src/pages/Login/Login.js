// dependencies
import React, { useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
// styles
import styles from './Login.module.css'
// set token in localStorage and pass authorization to api
import { login, isAuthenticated } from '../../services/auth'
// base api withou authorization
import api from '../../services/http/api'
// icon
import icon from '../../assets/discord.png'

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
        window.location.href = '/'
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
    <div className={styles.register}>
        <form onSubmit={handleSubmit(handleLoginForm)} className={styles.register_form}>
            <img className={styles.form_icon} src={icon} alt="funny brand" />
            <div className={styles.form_inputs}>
                <div className={styles.input_info}>
                    <span>Email</span>
                    <p ref={emailWarning} className={styles.email_warning}>
                      this e-mail isn&apos;t register in our database
                    </p>
                </div>
                <input
                  className={styles.form_input}
                  placeholder="type your e-mail"
                  name="email"
                  ref={register}
                />
            </div>
            <div className={styles.form_inputs}>
                <div className={styles.input_info}>
                    <span>Password</span>
                    <p ref={passwordWarning} className={styles.password_warning}>
                      this password is wrong
                    </p>
                </div>
                <input
                  className={styles.form_input}
                  placeholder="type your password"
                  type="password"
                  name="password"
                  ref={register}
                />
            </div>

            <button className={styles.form_button}>
              Log In
            </button>

            <Link to="/register" className={styles.make_account}>
              Click here to create an account!
            </Link>
        </form>
    </div>
  )
}

export default Login
