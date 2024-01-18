import { getAsync } from "../constant/request";

let baseUrl = 'http://api.airvisual.com/v2'
let keyString = `key=${process.env.REACT_APP_MAP_AIR_VISUAL_TOKEN}`
export async function getListCountries() {
  let url = baseUrl + `/countries?` + keyString
  const response = await getAsync(url);
  return response?.data || []
}

export async function getListStates(countryName) {
  let url = baseUrl + `/states?country=${countryName}&` + keyString
  const response = await getAsync(url);
  return response?.data || []
}

export async function getListCities(stateName, countryName) {
  let url = baseUrl + `/cities?state=${stateName}&country=${countryName}&` + keyString
  const response = await getAsync(url);
  return response?.data?.data || []
}

export async function getSpecializedCity(cityName, stateName, countryName) {
  let url = baseUrl + `/city?city=${cityName}&state=${stateName}&country=${countryName}&` + keyString
  const response = await getAsync(url);
  return response?.data || []
}

export async function getRank() { 
  let url = baseUrl + `/city_ranking&` + keyString
  const response = await getAsync(url);
  return response?.data || []

}

export async function getNearestCity() {
  let url = baseUrl + `/nearest_city?` + keyString
  const response = await getAsync(url);
  return response?.data?.data || {}
}
