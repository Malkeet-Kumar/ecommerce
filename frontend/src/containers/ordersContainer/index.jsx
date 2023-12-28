import React, { useEffect } from "react";
import style from './style.module.css'
import OrderFilter from "../../components/userComponents/orderFilter";
import { ORDERS_TITLE } from "../../utils/titles";
export default function OrdersContainer(props) {
    useEffect(()=>{
        document.title = ORDERS_TITLE
    })
    return (
        <div className={style.container}>
            <OrderFilter />
            <div className={style.orders}>
                {props.children}
            </div>
        </div>
    )
}