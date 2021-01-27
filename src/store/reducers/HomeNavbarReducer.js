const INIT_STATE = 'Online'

function HomeNavbarReducer (state = INIT_STATE, action) {
  if (action.type === 'HomeNavbar') {
    switch (action.payload) {
      case 'Online':
        return 'Online'
      case 'Pending':
        return 'Pending'
      case 'All':
        return 'All'
      case 'Blocked':
        return 'Blocked'
      case 'Add Friend':
        return 'Add Friend'
      default:
        break
    }
  }

  return state
}

export default HomeNavbarReducer
