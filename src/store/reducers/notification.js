const INIT_STATE = {
  pending: false,
  pendingAccept: false,
  removeFriend: false,
  messageRead: false
}

function notification (state = INIT_STATE, action) {
  if (action.type === 'notification') {
    return Object.assign({}, state, action.payload)
  }
  return state
}
export default notification
