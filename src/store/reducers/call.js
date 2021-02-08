const INIT_STATE = {
  modal: false,
  navbar: false,
  startCall: false,
  inCall: false,
  friendInCall: false,
  friend: false,
  friendId: false,
  mute: false,
  closeCall: false,
  to: false
}

function navbarCall (state = INIT_STATE, action) {
  if (action.type === 'call') {
    return Object.assign({}, state, action.payload)
  }
  return state
}

export default navbarCall
