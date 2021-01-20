//dependencies
import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faPhoneSquareAlt,
    faVideo,
    faPaperclip,
    faUserPlus,
    faSearch,
    faQuestionCircle,
    faInbox
} 
from '@fortawesome/free-solid-svg-icons';

//external files
import './chatNavbar.css';

const ChatNavbar = (props) => {

    //react-hook-states
    const [friend, setFriend] = useState({});

    //react-hook-effects
    useEffect(() => {
        setFriend(props.friend)
    }, [props.friend])

    //functions
    const overFocus = event => {
        event.target.style.width = 200 + 'px';
    }

    const outFocus = event => {
        event.target.style.width = 120 + 'px';
    }

    //jsx
    return(
        <div className="chatNavbar">
            {
            friend !== undefined &&

            <>
                <div className="chatNavbar-info">

                    <div className="chatNavbar-info--aroba">
                        @
                    </div>

                    <div className="chatNavbar-info--name">
                        {friend.name}
                    </div>

                    <div className="chatNavbar-info--status">
                        <div className={`chatNavbar-info--status--layer1`}>
                            <div className={`chatNavbar-info--status--layer2 ${friend.status}`}>
                            </div>
                        </div>
                        <div className="chatNavbar-info--status-legend">
                            {friend.status}
                        </div>
                    </div>

                </div>

                <div className="chatNavbar-setting">

                    <div className="chatNavbar-setting-icons">

                        <div className="chatNavbar-setting-icon">
                            <FontAwesomeIcon icon={faPhoneSquareAlt} />
                        </div>
                        <div className="chatNavbar-setting-icon">
                            <FontAwesomeIcon icon={faVideo} />
                        </div>
                        <div className="chatNavbar-setting-icon">
                            <FontAwesomeIcon icon={faPaperclip} />
                        </div>
                        <div className="chatNavbar-setting-icon">
                            <FontAwesomeIcon icon={faUserPlus}/>
                        </div>

                    </div>

                    <div className="chatNavbar-setting-search">
                        <input  placeholder="Search" 
                                className="chatNavbar-setting-search-input" 
                                onFocus={overFocus}
                                onBlur={outFocus}
                        />
                        <FontAwesomeIcon icon={faSearch} />
                    </div>

                    <div className="chatNavbar-setting-help">
                        <div className="chatNavbar-setting-icon">
                            <FontAwesomeIcon icon={faInbox} />
                        </div>
                        <div className="chatNavbar-setting-icon">
                            <FontAwesomeIcon icon={faQuestionCircle} />
                        </div>
                    </div>

                </div>
            </>
            }
        </div>
    )
}

export default ChatNavbar;
