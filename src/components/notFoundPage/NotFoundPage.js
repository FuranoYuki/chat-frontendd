import React, {useState, useEffect} from 'react';

import './NotFoundPage.css';

//router
import {useHistory, Redirect} from 'react-router-dom';

const NotFoundPage = () => {

    const [count, setCount] = useState(3);
    const history = useHistory()

    useEffect(() => {
        const obj = document.querySelector('.notfoundpage-count > span');
        setInterval(() => {
            !Number(obj.innerHTML) ? history.push('/') : setCount(Number(obj.innerHTML) - 1)
        }, 1000)
    }, [])

    const countdown = () => {
        setCount();
    }

    return(
        <div className="NotFoundPage">
            <div className="notfoundpage-header">
                404 Not found Page
            </div>
            <div className="notfoundpage-count">
                you will be redirect in <span>{count}</span>s...
            </div>
            <div className="notfoundpage-img">

            </div>
        </div>
    )
}

export default NotFoundPage