// React
import React, { useState, useEffect } from 'react'
// message component
import Message from './message/Message'
// css
import styles from './All.module.css'
import UserList from './userList/UserList'

const All = ({ friends, online }) => {
  const [view, setView] = useState(false)

  useEffect(() => {
    const numbFriendsOnline = friends !== undefined ? Object.values(friends).filter(data => data.status !== 'Offline').length : 0

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
    <div className={styles.all_friends}>
      {view
        ? <UserList friends={friends} online={online} />
        : <Message online={online}/>
      }
    </div>
  )
}

export default All
