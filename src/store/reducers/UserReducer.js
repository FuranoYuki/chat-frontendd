const INIT_STATE = {}

function userReducer(state = INIT_STATE, action){
    if(action.type === 'user_datas'){
        return Object.assign(state, action.payload)   
    } 
    return state
}

export default userReducer