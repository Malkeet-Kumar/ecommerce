import { useState } from "react";
import CartContext from "../context/CartContext";
import {defaultCart} from '../utils/defaultStateVariables'
export default function CartState(props){
    
    const [deliveryCharges,setDeliveryCharges] = useState(0)
    const [discount, setDiscount] = useState(0)
    
    return (
        <CartContext.Provider value={{discount,deliveryCharges,setDiscount,setDeliveryCharges}}>
            {props.children}
        </CartContext.Provider>
    )
}