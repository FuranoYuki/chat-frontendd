const INIT_STATE = {
  modal: false,
  navbar: false,
  inCall: false
}

function navbarCall (state = INIT_STATE, action) {
  if (action.type === 'call') {
    return Object.assign({}, state, action.payload)
  }
  return state
}

export default navbarCall
