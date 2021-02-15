// dependencies
import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
// icon
import icon from '../../assets/discord.png'
// style
import styles from './Register.module.css'
// api
import api from '../../services/http/api'
// set token in localStorage and pass to api header from now on
import { login, isAuthenticated } from '../../services/auth'

const Register = () => {
  const history = useHistory()
  const errorEmail = useRef(null)
  const emailInput = useRef(null)
  const passwordInput = useRef(null)
  const errorPassword = useRef(null)
  const { register, handleSubmit } = useForm()

  const formLoginSubmit = async (data) => {
    const { email, password } = data
    const name = email.split('@')[0]

    if (password.length > 6) {
      if (email.length > 5) {
        try {
          const res = await api.post('/user/register', { name, email, password })
          login(res.data.token)
          window.location.href = '/'
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
    errorPassword.current.style.display = 'none'
  }

  const emailEmpty = () => {
    errorEmail.current.innerHTML = 'empty input'
    errorEmail.current.style.display = 'flex'
    errorPassword.current.style.display = 'none'
  }

  const passwordError = () => {
    errorPassword.current.innerHTML = 'password need to have more than 6 characters !'
    errorPassword.current.style.display = 'flex'
    errorEmail.current.style.display = 'none'
  }

  useEffect(() => {
    if (isAuthenticated()) {
      history.push('/')
    }
  }, [])

  return (
    <div className={styles.login}>
        <form onSubmit={handleSubmit(formLoginSubmit)} className={styles.login_form}>
            <img src={icon} className={styles.form_icon}/>
            <div className={styles.form_header}>
                Register
            </div>
            <div className={styles.form_inputs}>
                <div ref={emailInput} className={styles.input_area}>
                    <div className={styles.area_top}>
                        <label className={styles.form_label}>
                            Email
                        </label>
                        <span ref={errorEmail} className={styles.error_email}></span>
                    </div>
                    <input
                        name="email"
                        className={styles.form_input}
                        ref={register}
                    />
                </div>
                <div ref={passwordInput} className={styles.input_area}>
                    <div className={styles.area_top}>
                        <label className={styles.form_label}>
                            Password
                        </label>
                        <span ref={errorPassword} className={styles.error_password}></span>
                    </div>
                    <input
                    name="password"
                    type="password"
                    className={styles.form_input}
                    ref={register}
                />
                </div>
            </div>
            <button type="submit" className={styles.form_button}>
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
