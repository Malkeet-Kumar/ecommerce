import UserContext from "../context/userContext"
import { useContext, useEffect, useState } from "react"
import { defaultUser } from "../utils/defaultStateVariables"
export default function UserAuthState(props){

    const u = JSON.parse(localStorage.getItem("user"))
    const us = (u?.user?.isUser)?u:null
    const [user,setUser] = useState(us?.user || defaultUser)
    const [cartTotal,setCartTotal] = useState(us?.cartTotal || 0)
    const [cartItems,setCartItems] = useState(us?.cartItems || 0)
    const [userAddresses,setUserAddresses] = useState(us?.addresses || [])
    return (
        <UserContext.Provider value={{user,userAddresses,cartItems,cartTotal,setUser,setCartItems,setCartTotal, setUserAddresses}}>
            {props.children}
        </UserContext.Provider>
    )
}