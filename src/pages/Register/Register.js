// dependencies
import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo, faComments, faUsers } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

// external files
import './Register.css'
import logo from '../../assets/logo_transparent.png'
import api from '../../services/http/api'
import { login, isAuthenticated } from '../../services/auth'

const Register = () => {
  const { register, handleSubmit } = useForm()
  const history = useHistory()

  useEffect(() => {
    if (isAuthenticated()) {
      history.push('/')
    }
  }, [])

  // logic for when the user submit the login form
  const formLoginSubmit = async (data) => {
    const { email, password } = data
    const name = email.split('@')[0]

    if (password.length > 6) {
      // call api for  register a new account
      api.post('/user/register', {
        name,
        email,
        password
      }).then(response => {
        login(response.data.token)
        history.push('/')
      }).catch(error => {
        emailExist(error.response.data)
      })
    } else {
      // error message
      const obj = document.querySelector('.error--password')
      obj.innerHTML = 'The password need to have more than 6 characters !'
      obj.style.display = 'flex'

      // input red
      document.querySelector('.password-area-input').style.border = '1px solid   rgb(255, 16, 16)'
    }
  }

  // logic for when the user try to register an e-mail that is already register
  const emailExist = (data) => {
    // error message
    const obj = document.querySelector('.error--email')
    obj.innerHTML = data
    obj.style.display = 'flex'

    // input red
    document.querySelector('.email-area-input').style.border = '1px solid   rgb(255, 16, 16)'
  }

  return (

        <div className="Login">

            <div className="login__marketing">

                <div className="login__marketing--call lm1-div">
                    <div className="login__marketing--call-icon lm3-icon">
                        <FontAwesomeIcon icon={faVideo} />
                    </div>
                    <div className="login__marketing--call-text lm2-txt">
                        Do it video call with you friends using Funy
                    </div>

                </div>

                <div className="login__marketing--chat lm1-div">
                    <div className="login__marketing--chat-icon lm3-icon">
                        <FontAwesomeIcon icon={faComments} />
                    </div>
                    <div className="login__marketing--chat-text lm2-txt">
                        gather with your friends to chat
                    </div>
                </div>

                <div className="login__marketing--plus lm1-div">
                    <div className="login__marketing--plus-icon lm3-icon">
                        <FontAwesomeIcon icon={faUsers} />
                    </div>
                    <div className="login__marketing--plus-text lm2-txt">
                        making groups with all of your friends and have fun together!
                    </div>
                </div>

            </div>

            <form onSubmit={handleSubmit(formLoginSubmit)} className="login__form">
                <img src={logo} className="login__form--logo"/>
                <div className="login__form--header">
                    Register
                </div>
                <div className="login__form--inputs">
                    <div className="login__form--input-area email-area-input">
                        <div className="login__form__input-area--top">
                            <label className="login__form-label">
                                Email
                            </label>
                            <span className="error--email"></span>
                        </div>
                        <input
                            name="email"
                            className="login__form--input"
                            ref={register}
                        />
                    </div>
                    <div className="login__form--input-area password-area-input">
                        <div className="login__form__input-area--top">
                            <label className="login__form-label">
                                Password
                            </label>
                            <span className="error--password"></span>
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
            </form>

        </div>
  )
}

export default Register
