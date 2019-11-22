import Cookies from 'js-cookie'

const kTokenKey = 'user-token'
export function setToken(token) {
  return Cookies.set(kTokenKey, token, {
    expires: 7
  })
}
export function getToken() {
  return Cookies.get(kTokenKey)
}
export function removeToken() {
  return Cookies.remove(kTokenKey)
}
