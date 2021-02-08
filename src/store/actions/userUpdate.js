export default function notification (data) {
  return {
    type: 'userUpdate',
    payload: data
  }
}
