import { combineReducers } from 'redux'
import userReducer from './UserReducer'
import HomeNavbarReducer from './HomeNavbarReducer'
import call from './call'

const rootReducers = combineReducers({
  userReducer,
  HomeNavbarReducer,
  call
})

export default rootReducers
