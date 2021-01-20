const INIT_STATE = "Online";

function HomeNavbarReducer(state = INIT_STATE, action){
    if(action.type === 'HomeNavbar'){
        switch (action.payload) {
            case 'Online':
                    return 'Online'
                break;

            case 'Pending':
                    return 'Pending'
                break;

            case 'All':
                    return 'All'
                break;

            case 'Blocked':
                    return 'Blocked'
                break;

            case 'Add Friend':
                    return 'Add Friend'
                break;
            default:
                break;
        }
    }

    return state
}

export default HomeNavbarReducer