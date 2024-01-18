import { createContext, useContext, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../constant/toast";
import { login, signup } from "../../services/authenService";


//context
export const LoginContext = createContext({})

//hook
export const useLoginContext = () => useContext(LoginContext)

//provider
export const LoginContextProvider = ({ children }) => {
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies(['currentuser']);
  const [userid, setUserid] = useState("")
  const handleSignup = async (username, password) => {
    let tmp = `{ "username": "${username}", "password": "${password}" }`
    let params = JSON.parse(tmp)
    if (username && password) {
      const response = await signup(params)
      if (response?.token) {
        toastSuccess("Success Notification !")
        await setCookie("currentuser", response?.token)

        setTimeout(() => window.location.reload(), 2000)

      }
      else
        toastError(response?.error)
    }
    else {
      toastError("Error")
    }
  }

  const handleLogin = async (username, password) => {
    let tmp = `{ "username": "${username}", "password": "${password}" }`
    let params = JSON.parse(tmp)

    if (username && password) {
      const response = await login(params)

      if (response?.token) {
        toastSuccess("Success Notification !")
        await setCookie("currentuser", response?.token)

        setTimeout(() => window.location.reload(), 2000)

      }
      else
        toastError(response?.error)
    }
    else {
      toastError("Error")
    }
  }


  const value = useMemo(() => ({
    handleSignup, handleLogin
  }),
    [])
  return (
    <LoginContext.Provider value={value}>
      {children}
    </LoginContext.Provider>
  )
}
