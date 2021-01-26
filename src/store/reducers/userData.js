const INIT_STATE = {}

function userData (state = INIT_STATE, action) {
  if (action.type === 'userData') {
    return Object.assign({}, state, action.payload)
  }
  return state
}

export default userData
