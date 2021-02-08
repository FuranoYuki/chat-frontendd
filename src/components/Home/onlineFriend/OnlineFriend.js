// dependencies
import React, { memo } from 'react'

// styles
import styles from './OnlineFriend.module.css'

const OnlineFriend = (props) => {
  return (
    <div className={styles.onlinefriend}>

        <div className={styles.onlinefriend_nofriend}>
            <div className={styles.nofriend_img}>

            </div>
            <div className={styles.nofriend_text}>
                No one&apos;s around to play with Wumpus.
            </div>
        </div>

    </div>
  )
}

export default memo(OnlineFriend)
