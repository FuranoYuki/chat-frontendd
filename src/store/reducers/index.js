import { combineReducers } from 'redux'
import HomeNavbarReducer from './HomeNavbarReducer'
import call from './call'
import userData from './userData'
import notification from './notification'

const rootReducers = combineReducers({
  HomeNavbarReducer,
  call,
  userData,
  notification
})

export default rootReducers
