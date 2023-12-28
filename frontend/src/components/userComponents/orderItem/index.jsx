import React from "react";
import style from './style.module.css'
import { LuIndianRupee } from "react-icons/lu"
import { FaCircle } from "react-icons/fa";
const Status = ({ status, date }) => {
    if (status == 0) {
        return <>
            <h4><FaCircle color="blue" className={style.statusIcon} />Order placed on {new Date(date).toLocaleDateString()}</h4>
            <div>
                <button className={style.actionBtn}>Request Cancellation</button>
                <button className={style.actionBtn}>Track Order</button>
            </div>
        </>
    }
    if (status == 1) {
        return <>
            <h4><FaCircle color="Green" className={style.statusIcon} />Order Confirmed</h4>
            <div>
                <button className={style.actionBtn}>Request Cancellation</button>
                <button className={style.actionBtn}>Track Order</button>
            </div>
        </>
    } else if (status == 2) {
        return <>
            <h4><FaCircle color="#ec0c0c" className={style.statusIcon} />Order dispatched</h4>
            <div>
                <button className={style.actionBtn}>Request Cancellation</button>
                <button className={style.actionBtn}>Track Order</button>
            </div>
        </>
    } else if (status == 3) {
        return (
            <>
                <h4><FaCircle color="orange" className={style.statusIcon} />On the way</h4>
                <div>
                    <button className={style.actionBtn}>Request Cancellation</button>
                    <button className={style.actionBtn}>Track Order</button>
                </div>
            </>
        )
    } else if(status==4){
        return <h4><FaCircle color="Green" className={style.statusIcon} /> Delivered on {date}</h4>
    }
}
export default function OrderItem({ order }) {
    const date = new Date().toDateString()
    return (
        <div className={style.orderItem}>
            <div className={style.c1}>
                <div className={style.imgBx}>
                    <img src={order.image} alt={order.name} />
                </div>
                <div className={style.details}>
                    <h4>{order.name}</h4>
                    <p>Seller: {order.sellerName}</p>
                </div>
            </div>
            <div className={style.c2}>
                <h4><LuIndianRupee fontSize={"14px"} />{order.billAmount}</h4>
            </div>
            <div className={style.c3}>
                <Status status={order.statusCode} date={order.placedDate} />
            </div>
        </div>
    )
}