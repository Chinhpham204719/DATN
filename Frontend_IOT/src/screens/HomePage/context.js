import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getListCities, getNearestCity, getSpecializedCity } from "../../services/airVisualService";

//context
export const MapContext = createContext({})

//hook
export const useMapContext = () => useContext(MapContext)

//provider
export const MapContextProvider = ({ children }) => {
  const [geocodingCity, setGeocodingCity] = useState([])
  const [nearestCity, setNearestCity] = useState()

  const getCitiesLocation = async () => {

    let listInfoCity = await getListCities("Hanoi", "Vietnam") || []
  console.log(listInfoCity)
    let promise = listInfoCity?.map((item) => getSpecializedCity(item?.city, "Hanoi", "Vietnam"))

    let tmpParam = await Promise.all(promise)
    console.log(tmpParam)
    setGeocodingCity(tmpParam)
  }

  const infoNearestCity = async () => {
    let info = await getNearestCity()
    setNearestCity(info)

  }

  const fetchData = async () => {
    getCitiesLocation()
    infoNearestCity()

  }


  useEffect(() => {

    fetchData()
  }, [])
  const value = useMemo(() => ({
    geocodingCity, nearestCity
  }),
    [geocodingCity, nearestCity])
  return (
    <MapContext.Provider value={value}>
      {children}
    </MapContext.Provider>
  )
}
