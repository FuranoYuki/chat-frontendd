//dependencies
import React, {useEffect, useState, memo} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
        faUserFriends, 
        faPlus,
        faMicrophone,
        faHeadphones,
        faCog,
        faTimes
} from '@fortawesome/free-solid-svg-icons';

//external files
import "./Social.css";

//api
import api from "../../services/http/api";

//token
import {logout} from '../../services/auth';

//route
import {useHistory} from 'react-router-dom';

//socket-io
import socket from '../../services/websocket/socket'

const Social = () => {

    //Hook - States
    const [user, setUser] = useState({});
    const [chat, setChats] = useState({})
    const [search, setSearch] = useState('');

    //route
    const history = useHistory();

    //Hook - Effects
    useEffect(() => {
        getChats();
        getUser();
    }, []);

    //socket
    useEffect(() => {
        socket.on('friendChangeStatus', () => {
            console.log('friend change status');
            getChats();
        })
    }, [])

    useEffect(() => {
        if(user._id !== undefined){
            socket.emit('userRoom', user.friends, user._id);
        }
    }, [user])

    //functions
    const showDeleteFriend = (event) => {
        event.currentTarget.lastElementChild.style.display = 'flex'
        event.currentTarget.firstElementChild.lastElementChild.style.color = 'white';
    }

    const hiddenDeleteFriend = (event) => {
        event.currentTarget.lastElementChild.style.display = 'none'
        event.currentTarget.firstElementChild.lastElementChild.style.color = 'rgb(174, 166, 166)';
    }

    const searchChange = (event) => {
        setSearch(event.target.value);
    }

    const changeStatus = () => {
        const obj = document.querySelector(".social__settings--info--status-list");
        obj.style.display === "flex" ? obj.style.display = "none" : obj.style.display = "flex"
    }

    const statusChange = async (event) => {
        if(user.status !== event.currentTarget.id){
            await api.post("/user/changeStatus", {status: event.currentTarget.id})
            getUser();
            socket.emit('changeStatus', user.friends);
        }
    }

    const getUser = () => {
        api.post("/user/getUser")
        .then(response => {
            setUser(response.data);
            
        })
        .catch(error => {
            if(error.response.tokenExpired === undefined){
                logout();
                history.push('/login');
            }
        });
    }

    const getChats = () => {
        api.post('/user/getUserChats')
        .then(data => {
            setChats(data.data);
        })
        .catch(error => {
            console.log(error);
        })
    }

    return(
        <div className="Social">

            <form className="social__search">
                <input 
                    className="social__search--input" 
                    placeholder="Encontre ou comece uma conversa" 
                    onChange={searchChange}
                />
            </form>

            <div className="social__body">

                <ul className="social__body--to_do">

                    <li className="social__body--to_do-li">
                        <Link className="social__body--to_do-link" to="/">
                            <FontAwesomeIcon icon={faUserFriends}/>
                            <span>Amigos</span>
                        </Link>
                    </li>

                    <li className="social__body--to_do-li">
                        <Link className="social__body--to_do-link" to="#">
                            <FontAwesomeIcon icon={faPlus}/>
                            <span>Create Group</span>
                        </Link>
                    </li>
                
                </ul>

                <ul className="social__body--friends">

                    {   
                        chat.chats !== undefined &&

                        chat.chats.map(data => data.friend
                            
                        ).filter(data => {
                            if(search === ''){
                                return data
                            }else if(data.name.toLowerCase().includes(search.toLowerCase())){
                                return data
                            }
                        }).map(friend => 
                            <li 
                                key={friend._id}
                                onMouseOver={showDeleteFriend} 
                                className="social__body--friends-li"
                                onMouseOut={hiddenDeleteFriend}
                            >

                                <Link to={`/chat/${friend._id}`} className="social__body--friends-link">
                                    <div className="social__body-friends-icon">

                                        {
                                            friend.imagePerfil === undefined ?

                                                <img 
                                                    className="social__body-friends-icon-img"
                                                    src={`/imagePerfil/${friend.imagePerfilDefault}`}
                                                    alt="perfil"
                                                />

                                            :

                                                <img 
                                                    className="social__body-friends-icon-img"
                                                    src={`/imagePerfil/${friend.imagePerfil.key}`}
                                                    alt="perfil"
                                                />
                                        }

                                        <div className='social__body-friends-icon-layer1'>
                                            <div className={`social__body-friends-icon-layer2 ${friend.status}`}>
                                                <div className={`social__body-friends-icon-layer3 ${friend.status}`}>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <span>{friend.name}</span>
                                </Link>
                                <div className="social__delete-friend">
                                    <FontAwesomeIcon icon={faTimes} />
                                </div>
                            </li>    
                        )
                    }

                </ul>

            </div>

            <div className="social__settings">

                <div className="social__settings--info">
                    
                    <div 
                        className="social__settings--info--status"
                        onClick={changeStatus}
                    >

                        {   
                            user.imagePerfil === undefined ?

                                <img 
                                    src={`/imagePerfil/${user.imagePerfilDefault}`}
                                    alt="perfil"
                                    className="social__settings--info--status-img" 
                                />

                                :

                                <img 
                                    src={`/imagePerfil/${user.imagePerfil.key}`}
                                    alt="perfil"
                                    className="social__settings--info--status-img" 
                                />

                        }


                        <div className="social__settings--info--status-layer1">
                            <div className={`social__settings--info--status-layer2 ${user.status}`}>
                                <div className={`social__settings--info--status-layer2 ${user.status}`}>

                                </div>
                            </div>
                        </div>

                        <div 
                            className="social__settings--info--status-list"
                        >

                            <div 
                                className="social__settings-info--status-list-li online"
                                onClick={statusChange}
                                id="Online"
                            >
                                <div className="social__settings-info-li-icon">
                                    <div className="social__settings-info-li-icon-2 Online">

                                    </div>
                                </div>
                                <div className="social__settings-info-li-text">
                                    Online
                                </div>
                            </div>

                            <div 
                                className="social__settings-info--status-list-li"
                                onClick={statusChange}
                                id="Idle"
                            >
                                <div className="social__settings-info-li-icon">
                                    <div className="social__settings-info-li-icon-2 Idle">

                                    </div>
                                </div>
                                <div className="social__settings-info-li-text">
                                    Idle
                                </div>
                            </div>

                            <div 
                                className="social__settings-info--status-list-li"
                                onClick={statusChange}
                                id="DND"
                            >
                                <div className="social__settings-info-li-icon">
                                    <div className="social__settings-info-li-icon-2 DND">

                                    </div>  
                                </div>
                                <div className="social__settings-info-li-text">
                                    <div className="social__settings-info-li-text-header">
                                        Do Not Disturb
                                    </div>
                                    <div className="social__settings-info-li-text-body">
                                        You will not appear online, but will have full access to all of Discord.
                                    </div>
                                </div>
                            </div>

                            <div 
                                className="social__settings-info--status-list-li"
                                onClick={statusChange}
                                id="Offline"
                            >
                                <div className="social__settings-info-li-icon">
                                    <div className="social__settings-info-li-icon-2 Invisible">

                                    </div>
                                </div>
                                <div className="social__settings-info-li-text">
                                    <div className="social__settings-info-li-text-header">
                                        Invisible
                                    </div>
                                    <div className="social__settings-info-li-text-body">
                                        You will not appear online, but will have full access to all of Discord.
                                    </div>
                                </div>
                            </div>

                            <div className="social__settings-info--status-list-li custom">
                                <div className="social__settings-info-li-icon">

                                </div>
                                <div className="social__settings-info-li-text">
                                    Set a custom status
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="social__settings--info--user">
                        <span className="social__settings--info--user-name">
                            {user.name}
                        </span>
                        <span className="social__settings--info--user-code">
                            {user.code}
                        </span>
                    </div>

                </div>

                <ul className="social__settings--actions">
                    <li className="social__settings--actions-li social-microphone">
                        <FontAwesomeIcon icon={faMicrophone} />
                    </li>
                    <li className="social__settings--actions-li social-headphones">
                        <FontAwesomeIcon icon={faHeadphones} />
                    </li>
                    <li className="social__settings--actions-li social-cog">
                        <Link to="/config">
                            <FontAwesomeIcon icon={faCog} />
                        </Link>
                    </li>
                </ul>

            </div>

        </div>
    )
}

export default memo(Social)