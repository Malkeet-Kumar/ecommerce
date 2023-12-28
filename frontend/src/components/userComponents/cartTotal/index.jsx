import React, { useContext, useEffect, useState } from "react";
import style from './style.module.css'
import { LuIndianRupee } from "react-icons/lu"
import CartContext from "../../../context/CartContext";
import { ordersUrl } from "../../../apis/apiUrls";
import UserContext from "../../../context/userContext";
export default function CartBill({ carts, onClick }) {
    const [showPayment, setShowPayment] = useState(false)
    const { cartTotal } = useContext(UserContext)
    const { deliveryCharges, discount } = useContext(CartContext)

    const placeOrder = () => {
        onClick()
    }

    return (
        <div className={style.container}>
            <h3>Price Dtails</h3>
            <div className={style.details}>
                <div className={style.left}>
                    <p>Price</p>
                    <p>Discount</p>
                    <p>Delivery Charges</p>
                </div>
                <div className={style.right}>
                    <p><LuIndianRupee fontSize={"15px"} />{cartTotal}</p>
                    <p>-<LuIndianRupee fontSize={"15px"} />{discount}</p>
                    <p><LuIndianRupee fontSize={"15px"} />{deliveryCharges}</p>
                </div>
            </div>
            <div className={style.total}>
                <h2>Total</h2>
                <h2><LuIndianRupee fontSize={"19px"} />{cartTotal}</h2>
            </div>
            <div className={style.action}>
                <button onClick={placeOrder}>Place Order</button>
            </div>
        </div>
    )
}