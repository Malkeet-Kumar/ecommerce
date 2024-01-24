import SellerContext from "../context/sellerContext"
import { useState } from "react"
import { defaultSeller } from "../utils/defaultStateVariables"
export default function SellerAuthState(props){
    const user = JSON.parse(localStorage.getItem("user"))
    const [seller,setSeller] = useState(user || defaultSeller)
    return (
        <SellerContext.Provider value={{seller,setSeller}}>
            {props.children}
        </SellerContext.Provider>   
    )
}