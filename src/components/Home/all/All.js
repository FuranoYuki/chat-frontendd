// React
import React, { useState, useEffect } from 'react'
// message component
import Message from './message/Message'
// css
import './All.css'
import UserList from './userList/UserList'

const All = ({ friends, online }) => {
  const [view, setView] = useState(false)

  useEffect(() => {
    const numbFriendsOnline = friends !== undefined ? friends.filter(data => data.status !== 'Offline').length : 0

    if (friends === undefined) {
      setView(false)
    } else {
      if ((online && numbFriendsOnline > 0) || (!online && friends.length > 0)) {
        setView(true)
      } else {
        setView(false)
      }
    }
  }, [friends, online])

  return (
    <div className="All-friends">
      {view
        ? <UserList friends={friends} online={online} />
        : <Message online={online}/>
      }
    </div>
  )
}

export default All
