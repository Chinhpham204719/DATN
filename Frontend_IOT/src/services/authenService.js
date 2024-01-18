import { getAsyncWithToken, postAsync } from "../constant/request";


function getCookie(name = 'currentuser') {
  const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}

export async function login(params) {
  const url = process.env.REACT_APP_BACK_END + '/users/login'
  const response = await postAsync(url, params)
  return response?.data || []
}
export async function signup(data) {
  const url = process.env.REACT_APP_BACK_END + '/users'
  const response = await postAsync(url, data)
  return response?.data || []
}
export async function getUserInfo() {
  const url = process.env.REACT_APP_BACK_END + '/users/currentuser'
  const response = await getAsyncWithToken(url)
  return response?.data || []
}
export async function logoutUser() {
  const url = process.env.REACT_APP_BACK_END + '/users/logout'
  await fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getCookie(),
      'Accept': 'application/json',
    }
  },
  ).then(data => { console.log('data', data?.statusText);return data?.statusText || '' })
    .catch(err => console.log(`err`, err))
}