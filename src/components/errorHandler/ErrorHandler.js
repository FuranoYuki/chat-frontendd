import { logout } from '../../services/auth'

export default function ErrorHandler (error) {
  if (error.response.tokenExpired === undefined) {
    logout()
    window.location.href = '/'
  } else if (error.name === 'NetWorkError') {
    window.location.href = '/error-500'
  } else {
    return ''
  }
}
