import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getNearestCity } from "../../services/airVisualService";
import { getDeviceById } from "../../services/devicesServices";

//context
export const StatisticsContext = createContext({})

//hook
export const useStatisticsContext = () => useContext(StatisticsContext)

//provider
export const StatisticsContextProvider = ({ children }) => {
  const [device, setDevice] = useState()
  const [nearestCity, setNearestCity] = useState()

  useEffect(() => {
    getDeviceItemById().then(r => console.log(r))
    infoNearestCity().then(r => console.log(r))
  }, [])

  const getDeviceItemById = async () => {
    try {
      if (window) var id = window.location.pathname.split('/')
      let tmp = await getDeviceById(id[2])
      setDevice(tmp?.device || {})
    } catch (error) {
      console.log(`error`, error)
    }

  }

  setInterval(getDeviceItemById, 30000)

  const infoNearestCity = async () => {
    let info = await getNearestCity()
    setNearestCity(info)

  }



  const value = useMemo(() => ({
    device, nearestCity
  }),
    [device, nearestCity])
  return (
    <StatisticsContext.Provider value={value}>
      {children}
    </StatisticsContext.Provider>
  )
}
