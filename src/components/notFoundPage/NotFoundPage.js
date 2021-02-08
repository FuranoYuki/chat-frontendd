import React, { useState, useEffect } from 'react'
// styles
import styles from './NotFoundPage.module.css'
// router
import { useHistory } from 'react-router-dom'

const NotFoundPage = () => {
  const history = useHistory()
  const [count, setCount] = useState(3)

  useEffect(() => {
    const obj = document.querySelector('.zz > span')
    setInterval(() => {
      !Number(obj.innerHTML)
        ? history.push('/')
        : setCount(Number(obj.innerHTML) - 1)
    }, 1000)
  }, [])

  return (
    <div className={styles.notfoundpage}>
        <div className={styles.notfoundpage_header}>
            404 Not found Page
        </div>
        <div className={`${styles.notfoundpage_count} zz`}>
            you will be redirect in <span >{count}</span>s...
        </div>
        <div className={styles.notfoundpage_img}>

        </div>
    </div>
  )
}

export default NotFoundPage
