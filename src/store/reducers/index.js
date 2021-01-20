import { combineReducers } from 'redux'
import userReducer from './UserReducer';
import HomeNavbarReducer from './HomeNavbarReducer';

const rootReducers = combineReducers({
    userReducer,
    HomeNavbarReducer
})

export default rootReducers