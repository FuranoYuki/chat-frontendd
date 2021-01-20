//dependencies
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

//components
import "./Home.css";
import Social from '../../components/social/Social';
import HomeNavbar from '../../components/Home/homeNavbar/homeNavbar';
import Group from '../../components/group/Group';
import AddFriend from '../../components/Home/addFriend/AddFriend';
import Pending from '../../components/Home/pedding/Pending';
import All from '../../components/Home/all/All';

//api http
import api from '../../services/http/api';

//api websocket
import socket from '../../services/websocket/socket';

//token
import {logout} from '../../services/auth';

//route
import {useHistory} from 'react-router-dom';

const Home = () => {

    //states
    const [friends, setFriends] = useState("");
    const [pending, setPending] = useState({});
    const [homeNav, setHomeNav] = useState("Online");

    //Reducers
    const state = useSelector(state => state.HomeNavbarReducer);
    const userReducer = useSelector(state => state.userReducer);

    //route
    const history = useHistory();

    // -- EFFECTS --

    useEffect(() => {
        getFriend();
        getPending();
    }, []);

    useEffect(() => {
        socket.on('friendChangeStatus', () => {
            getFriend();
        });

        socket.on('newPending', () => {
            console.log('new Pending');
            getPending();
        });
    }, [])

    useEffect(() => {
        setHomeNav(state)
    }, [state]);

    useEffect(() => {
        setFriends(userReducer);
    }, [userReducer])

    // -- FUNCTIONS --
    const dicideView = (data) => {
        switch (data) {
            case 'Add Friend':
                    return <AddFriend />
                break;
            
            case 'Pending':
                    return <Pending pending={pending.pending}/>
                break;

            case 'Online':
                    return <All friends={friends.friends} online={true} />
                break;

            case 'All':
                    return <All friends={friends.friends} online={false} />
                break;

            default:
                    return <AddFriend/>
                break;
        }
    }

    const getFriend = () => {
        api.post("/user/getFriends")
        .then(response => {
            setFriends(response.data);
            
        })
        .catch(error => {
            if(error.response.tokenExpired == undefined){
                logout();
                history.push('/login');
            }
        })
    }

    const getPending = () => {
        api.post('/user/getPending')
        .then(response => {
            setPending(response.data)
        })
        .catch(error => {
            console.log(error);
        })
    }

    // -- JSX --

    return(
        <div className="Home">

            <Group/>

            <Social/>

            <div className="home__body">
                <HomeNavbar user={friends}/>
                {
                    dicideView(homeNav)
                }
            </div>  

        </div>
    )
}

export default Home