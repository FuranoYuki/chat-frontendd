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
import tokenExpired from '../../components/tokenExpired/tokenExpired'
// action
import notificationAction from '../../store/actions/notification'

const Home = () => {
  const [friends, setFriends] = useState('')
  const [pending, setPending] = useState({})
  const state = useSelector(state => state.HomeNavbarReducer)
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    getFriend()
    getPending()
  }, [])

  useEffect(() => {
    if (notification.pending) {
      getPending()
      dispatch(notificationAction({ pending: false }))
    }
  }, [notification])

  useEffect(() => {
    socket.on('friendChangeStatus', () => { getFriend() })
    socket.on('pendingNotification', () => { getPending() })
  }, [])

  const dicideView = (data) => {
    switch (data) {
      case 'Add Friend':
        return <AddFriend/>
      case 'Pending':
        return <Pending pending={pending.pending}/>
      case 'Online':
        return <All friends={friends.friends} online={true} />
      case 'All':
        return <All friends={friends.friends} online={false} />
      default:
        return <AddFriend/>
    }
  }

  const getFriend = () => {
    api.post('/user/getFriends')
      .then(response => {
        setFriends(response.data)
      })
      .catch(error => {
        tokenExpired(error)
      })
  }

  const getPending = () => {
    api.post('/user/getPending')
      .then(response => {
        setPending(response.data)
      })
      .catch(error => {
        tokenExpired(error)
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
