// react
import React, { memo } from 'react'

// style
import './All.css'

// view
import View from './view/View'

// message
import Message from './message/Message'

const All = ({ friends, online }) => {
  // functions
  const definyView = (user) => {
    if (friends !== undefined) {
      if (friends.length > 0) {
        return <View friends={friends} online={online} />
      }

      return <Message />
    }
  }

  // jsx
  return (
        <div className="All">
            {
                definyView(friends)
            }
        </div>
  )
}

export default memo(All)
