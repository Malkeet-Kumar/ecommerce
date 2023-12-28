import SellerContext from "../context/sellerContext"
import { useState } from "react"
import { defaultSeller } from "../utils/defaultStateVariables"
export default function SellerAuthState(props){
    const user = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):defaultSeller
    const [seller,setSeller] = useState(user)
    return (
        <SellerContext.Provider value={{seller,setSeller}}>
            {props.children}
        </SellerContext.Provider>   
    )
}