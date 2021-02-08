const INIT_STATE = {
  email: false,
  name: false,
  image: false
}

function userUpdate (state = INIT_STATE, action) {
  if (action.type === 'userUpdate') {
    return Object.assign({}, state, action.payload)
  }
  return state
}

export default userUpdate
