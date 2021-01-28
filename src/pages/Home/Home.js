// dependencies
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// components
import './Home.css'
import HomeNavbar from '../../components/Home/homeNavbar/homeNavbar'
import AddFriend from '../../components/Home/addFriend/AddFriend'
import Pending from '../../components/Home/pedding/Pending'
import All from '../../components/Home/all/All'
// api http
import api from '../../services/http/api'
// api websocket
import socket from '../../services/websocket/socket'
// token
import ErrorHandler from '../../components/errorHandler/ErrorHandler'
// action
import notificationAction from '../../store/actions/notification'

const Home = () => {
  const [friends, setFriends] = useState('')
  const [pending, setPending] = useState('')
  const state = useSelector(state => state.HomeNavbarReducer)
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    getFriend()
    getPending()
  }, [])

  useEffect(() => {
    socket.on('friendChangeStatus', () => { getFriend() })
  }, [friends])

  useEffect(() => {
    socket.on('pendingNotification', () => { getPending() })
  }, [pending])

  useEffect(() => {
    if (notification.pending) {
      getPending()
      dispatch(notificationAction({ pending: false }))
    }
  }, [notification])

  const dicideView = (data) => {
    switch (data) {
      case 'Add Friend':
        return <AddFriend/>
      case 'Pending':
        return <Pending pending={pending}/>
      case 'Online':
        return <All friends={friends} online={true} />
      case 'All':
        return <All friends={friends} online={false} />
      default:
        return <AddFriend/>
    }
  }

  const getFriend = () => {
    api.post('/user/getFriends')
      .then(response => {
        setFriends(response.data.friends)
      })
      .catch(error => {
        ErrorHandler(error)
      })
  }

  const getPending = () => {
    api.post('/user/getPending')
      .then(response => {
        setPending(response.data.pending)
      })
      .catch(error => {
        ErrorHandler(error)
      })
  }

  return (
    <div className="Home">
      <div className="home__body">
          <HomeNavbar user={friends}/>
          {
              dicideView(state)
          }
      </div>
    </div>
  )
}

export default Home
