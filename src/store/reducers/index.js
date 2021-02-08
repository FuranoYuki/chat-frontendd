import { combineReducers } from 'redux'
import HomeNavbarReducer from './HomeNavbarReducer'
import call from './call'
import userData from './userData'
import notification from './notification'
import userUpdate from './userUpdate'

const rootReducers = combineReducers({
  HomeNavbarReducer,
  call,
  userData,
  notification,
  userUpdate
})

export default rootReducers
