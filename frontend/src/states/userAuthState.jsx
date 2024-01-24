import UserContext from "../context/userContext"
import { useContext, useEffect, useState } from "react"
import { defaultUser } from "../utils/defaultStateVariables"
export default function UserAuthState(props){

    const u = JSON.parse(localStorage.getItem("user"))
    const us = (u)?u:defaultUser
    const [user,setUser] = useState(us.user)
    const [cartTotal,setCartTotal] = useState(us.cartTotal)
    const [cartItems,setCartItems] = useState(us.cartItems)
    const [userAddresses,setUserAddresses] = useState(us.addresses)
    return (
        <UserContext.Provider value={{user,userAddresses,cartItems,cartTotal,setUser,setCartItems,setCartTotal, setUserAddresses}}>
            {
                console.log(localStorage.getItem("user"))
            }
            {props.children}
        </UserContext.Provider>
    )
}