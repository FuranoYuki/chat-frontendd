import React from 'react'

// style
import styles from './Loading.module.css'

const Loading = () => {
  return (
    <div className={styles.loading}>
        <div className={styles.loading_header}>
            Loading Page
        </div>

        <div className={styles.loading_dots}>
            <div className={styles.bounce}></div>
            <div className={styles.bounce2}></div>
            <div className="bounce3"></div>
        </div>

    </div>
  )
}

export default Loading
