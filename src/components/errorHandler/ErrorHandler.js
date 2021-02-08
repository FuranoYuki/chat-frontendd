import { logout } from '../../services/auth'

export default function ErrorHandler (error) {
  if (error.response !== undefined) {
    if (error.response.tokenExpired === undefined) {
      logout()
      window.location.href = '/'
    }
  }
}
