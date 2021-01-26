const INIT_STATE = {
  pending: false
}

export default function notification (state = INIT_STATE, action) {
  if (action.type === 'notification') {
    return Object.assign({}, state, action.payload)
  }
  return state
}
