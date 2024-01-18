import { lazy } from "react";

const HomePage = lazy(() => import("./screens/HomePage"))
const Login = lazy(() => import("./screens/Login"))

export const AuthenRouter = [
  { path: "/", Component: HomePage }

]

export const NotAuthenRouter = [
    { path: "/login", Component: Login }
]