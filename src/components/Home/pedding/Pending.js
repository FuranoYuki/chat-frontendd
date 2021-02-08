import React, { memo } from 'react'
// style
import styles from './Pedding.module.css'
// components
import View from './view/View'
import Message from './message/Message'

const Pending = ({ pending }) => {
  return (
    <div className={styles.pedding}>
        {
          pending.length > 0

            ? <View pending={pending} />
            : <Message />
        }
    </div>
  )
}

export default memo(Pending)
