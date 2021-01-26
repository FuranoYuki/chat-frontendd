import { logout } from '../../services/auth'

export default function tokenExpired (error) {
  console.log(error)
  if (error.response.tokenExpired === undefined) {
    logout()
    window.location.href = '/'
  }
}
