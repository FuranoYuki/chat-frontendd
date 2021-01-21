import React from 'react';

//style
import './Loading.css';

const Loading = () => {

    return(
        <div className="Loading">
            <div className="loading-header">
                Loading Page
            </div>

            <div className="loading-dots">
                <div className="bounce"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div>

        </div>
    )
}

export default Loading;