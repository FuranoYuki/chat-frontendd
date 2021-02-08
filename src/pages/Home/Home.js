// dependencies
import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// components
import styles from './Home.module.css'
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
  const moutend = useRef(false)
  const dispatch = useDispatch()
  const [friends, setFriends] = useState('')
  const [pending, setPending] = useState('')
  const state = useSelector(state => state.HomeNavbarReducer)
  const notification = useSelector(state => state.notification)

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

  const getFriend = async () => {
    try {
      const res = await api.post('/user/getFriends')
      setFriends(res.data.friends)
    } catch (error) {
      ErrorHandler(error)
    }
  }

  const getPending = async () => {
    try {
      const res = await api.post('/user/getPending')
      setPending(res.data.pending)
    } catch (error) {
      ErrorHandler(error)
    }
  }

  useEffect(() => {
    moutend.current = true
    return () => {
      moutend.current = false
    }
  }, [])

  useEffect(() => {
    if (moutend.current) {
      getFriend()
      getPending()
      window.document.title = 'Discord'
    }
  }, [])

  useEffect(() => {
    if (notification.removeFriend && moutend.current) {
      getFriend()
      dispatch(notificationAction({ removeFriend: false }))
    }
  }, [notification.removeFriend])

  useEffect(() => {
    if (moutend.current) {
      socket.on('friendRemoved', () => { getFriend() })
      socket.on('pendingRequest', () => { getPending() })
      socket.on('friendChangeStatus', () => { getFriend() })
      socket.on('pendingNotificationRecuse', () => { getPending() })
      socket.on('pendingNotificationAccept', () => {
        getPending()
        getFriend()
      })
    }
  }, [])

  useEffect(() => {
    if (notification.pending && moutend.current) {
      if (notification.pendingAccept) {
        dispatch(notificationAction({ pending: false, pendingAccept: false }))
        getFriend()
        getPending()
      } else {
        dispatch(notificationAction({ pending: false }))
        getPending()
      }
    }
  }, [notification.pending])

  return (
    <div className={styles.home}>
      <div className={styles.home_body}>
        <HomeNavbar pending={pending}/>
        {dicideView(state)}
      </div>
    </div>
  )
}

export default Home
