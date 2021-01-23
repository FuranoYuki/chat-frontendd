// dependencies
import React, { memo, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// style
import './Group.css'
// api
import api from '../../services/http/api'
// socket-io
import socket from '../../services/websocket/socket'
// callmodal
import CallModal from '../callModal/CallModal'
// action
import call from '../../store/actions/call'

// JSX
const Group = () => {
  const [friend, setFriend] = useState('')
  const dispatch = useDispatch()

  const mounted = useRef(false)

  useEffect(() => {
    mounted.current = true
    return () => (mounted.current = false)
  })

  useEffect(() => {
    if (mounted.current) {
      socket.on('receving call', data => {
        api.post('/user/getFriend', { id: data })
          .then(response => {
            setFriend(response.data)
            console.log('aloalo')
            dispatch(call({ navbar: true }))
            dispatch(call({ modal: true }))
          })
          .catch(error => {
            console.log(error)
          })
      })
    }
  }, [])

  const groupMouseOver = event => {
    const sign = event.currentTarget.firstElementChild

    sign.style.display = 'flex'
    sign.style.height = 20 + 'px'
  }

  const groupMouseOut = event => {
    const sign = event.currentTarget.firstElementChild

    sign.style.display = 'none'
  }

  return (
        <div className="Group">

            <CallModal friend={friend} />

            <Link
                to="/"
                className="group__discord"
                onMouseOver={groupMouseOver}
                onMouseOut={groupMouseOut}
            >

                <div className="group__discord--sign">
                </div>

                <div className="group__discord--img">
                    <img
                      src='https://discord.com/assets/6debd47ed13483642cf09e832ed0bc1b.png'
                      alt='icon'
                    />
                </div>

                <div className='group__discord--legend'>
                    Home
                </div>

            </Link>

            <ul className="group__groups">

                <li className="group__groups--li"
                    onMouseOver={groupMouseOver}
                    onMouseOut={groupMouseOut}
                >

                    <div className="group__groups--sign">

                    </div>

                    <div className="group__groups--perfil">

                        <div className="group__groups--img">

                        </div>

                        <div className="group__groups--layer-1">
                            <div className="group__groups--layer-2">
                                <div className="group__groups--layer-3">
                                    1
                                </div>
                            </div>
                        </div>

                    </div>
{/*
                    <div className="group__groups--legend">
                        Home
                    </div> */}

                </li>

            </ul>

        </div>
  )
}

export default memo(Group)
