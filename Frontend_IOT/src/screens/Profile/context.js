import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { getPublicDevices, getUserDevices } from "../../services/devicesServices"

//context
export const ProfileContext = createContext({})

//hook
export const useProfileContext = () => useContext(ProfileContext)

//provider
export const ProfileContextProvider = ({ children }) => {
  const [listDevices, setListDevices] = useState([])
  const [user, setUser] = useState({})
  const [listPublicDevice, setListPublicDevices] = useState([])

  useEffect(() => {
    getListDevices()
    getListPublicDevices()
  }, [])

  const getListDevices = async () => {
    const res = await getUserDevices()
    setListDevices(res?.devices)
    setUser(res?.user)
  }

  const getListPublicDevices = async () => {
    const res = await getPublicDevices()
    setListPublicDevices(res)
  }

  const value = useMemo(() => ({
    listDevices, getListDevices, user, listPublicDevice
  }),
    [listDevices, user, listPublicDevice])
  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  )
}
