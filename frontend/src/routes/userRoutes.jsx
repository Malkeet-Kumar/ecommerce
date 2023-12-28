import UserApp from "../apps/UserApp"
import Home from "../containers/homeContainer"
import Cart from "../pages/cartpage/carts"
import Products from "../pages/productPage/products"
import Login from "../pages/loginSignupScreen"
import Orders from "../pages/orders"
import { useContext } from "react"
import UserContext from "../context/userContext"
import { Navigate } from "react-router-dom"
const userRoutes = [
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"home",
        element:<Home/>
      },
      {
        path:"cart",
        element:<Cart/>
      },
      {
        path:"shop",
        element:<Products/>
      },
      {
        path:"orders",
        element:<Orders/>
      },
      {
        path:"login",
        element:<Login/>
      },
    ]

export default userRoutes