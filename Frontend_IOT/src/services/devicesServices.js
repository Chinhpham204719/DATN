import { deleteAsyncWithToken, getAsync, getAsyncWithToken, postAsyncWithToken, putAsyncWithToken } from "../constant/request";

function getCookie(name = 'userid') {
  const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}

function getCookieUser(name = 'currentuser') {
  const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}

export async function getUserDevices() {
  const url = process.env.REACT_APP_BACK_END + '/users/' + getCookie()
  const response = await getAsyncWithToken(url)
  return response?.data || []
}

export async function deleteDeviceById(deviceId) {
  const url = process.env.REACT_APP_BACK_END + '/devices/' + deviceId
  const response = await deleteAsyncWithToken(url)
  return response?.data || []
}
export async function updateDeviceById(deviceId, params = {}) {
  const url = process.env.REACT_APP_BACK_END + '/devices/' + deviceId
  const response = await putAsyncWithToken(url, params)
  return response?.data || []
}
export async function getDeviceById(deviceId) {
  const url = process.env.REACT_APP_BACK_END + '/devices/' + deviceId
  const response = await getAsyncWithToken(url)
  return response?.data || []
}

export async function updateDeviceByIdFetch(deviceId, params = {}) {
  const url = process.env.REACT_APP_BACK_END + '/devices/' + deviceId
  await fetch(url, {
    method: 'PUT',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getCookieUser(),
      'Accept': 'application/json',
    },
    body: JSON.stringify(params)
  },
  ).then(data => { return data?.data || [] })
    .catch(err => console.log(`err`, err))
  // const response = await putAsyncWithToken(url, params)
  // console.log(`response`, response, params)

}

export async function addDeviceById(param) {
  const url = process.env.REACT_APP_BACK_END + '/users/' + getCookie() + '/devices'
  const response = await postAsyncWithToken(url, param)
  return response?.data || []
}

export async function addDeviceByIdFetch(params = {}) {
  const url = process.env.REACT_APP_BACK_END + '/users/' + getCookie() + '/devices'
  await fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getCookieUser(),
      'Accept': 'application/json',
    },
    body: JSON.stringify(params)
  },
  ).then(data => { return data?.data || [] })
    .catch(err => console.log(`err`, err))
  // const response = await putAsyncWithToken(url, params)
  // console.log(`response`, response, params)

}
export async function getPublicDevices() {
  let url = process.env.REACT_APP_BACK_END + '/devices/publicDevices'
  const response = await getAsync(url)
  return response?.data || []
}