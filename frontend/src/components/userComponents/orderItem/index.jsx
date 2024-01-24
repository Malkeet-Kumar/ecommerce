import React, { useEffect, useState } from "react";
import style from './style.module.css'
import { LuIndianRupee } from "react-icons/lu"
import { FaCircle } from "react-icons/fa";
import { ordersUrl, sellerInventory, trackingUrl } from "../../../apis/apiUrls";
import { message } from "antd";

const Status = ({oid, status, date, showTracking, cancelOrder }) => {
    if (status == 0) {
        return <>
            <h4><FaCircle color="blue" className={style.statusIcon} />Order placed on {new Date(date).toLocaleDateString()}</h4>
            <div>
                <button className={style.actionBtn} onClick={e=>cancelOrder(oid)}>Request Cancellation</button>
            </div>
        </>
    }
    if (status == 1) {
        return <>
            <h4><FaCircle color="Green" className={style.statusIcon} />Order Confirmed</h4>
            <div>
                <button className={style.actionBtn} onClick={e=>cancelOrder(oid)}>Request Cancellation</button>
            </div>
        </>
    } else if (status == 2) {
        return <>
            <h4><FaCircle color="#ec0c0c" className={style.statusIcon} />Order dispatched</h4>
            <div>
                <button className={style.actionBtn} onClick={e=>showTracking()} >Track Order</button>
                <button className={style.actionBtn} onClick={e=>cancelOrder(oid)}>Request Cancellation</button>
            </div>
        </>
    } else if (status == 3) {
        return (
            <>
                <h4><FaCircle color="orange" className={style.statusIcon} />On the way</h4>
                <div>
                    <button className={style.actionBtn} onClick={e=>showTracking()}>Track Order</button>
                    <button className={style.actionBtn} onClick={e=>cancelOrder(oid)}>Request Cancellation</button>
                </div>
            </>
        )
    } else if (status == 4) {
        return <h4><FaCircle color="Green" className={style.statusIcon} /> Delivered on {new Date(date).toLocaleDateString()}</h4>
    } else {
        return <h4><FaCircle color="red" className={style.statusIcon} /> Cancelled</h4>
    }
}

const Track = (props)=>{
    const [trackingData, setTrackingData] = useState([])

    const getData = async()=>{
        const res = await fetch(trackingUrl+"?oid="+props.oid,{method:"GET",headers:{authorization:localStorage.getItem("token")}})
        const data = await res.json()
        setTrackingData(data)
    }

    useEffect(()=>{
        getData()
    },[])

    return(
        <div className={style.trackingStatus}>
            {trackingData.map(d=>{
                if(d.statusCode==1){
                    return <p>Order Confirmed on {new Date(d.date).toLocaleDateString()}</p>
                } else if(d.statusCode==2){
                    if(d.arrived==1){
                        return <p>Order Arrived at {d.location} on {new Date(d.date).toLocaleDateString()}</p>
                    } else {
                        return <p>Order Dispatched to {d.location}</p>
                    } 
                } else {
                    return <p>Order is out for delivery</p>
                }
            })}
        </div>
    )
}

const ReasonContainer = ({oid,cancelOrder})=>{
    const [reason,setReason] = useState("")
    const cancell = ()=>{
        if(reason.length<=8){
            message.warning("Please provide a reason")
            return
        }
        cancelOrder(oid,reason)
    }
    return (
        <div className={style.reason}>
            <textarea value={reason} onInput={e=>setReason(e.target.value)} cols="30" rows="10" className={style.reasonInput} placeholder="Tell us why cancelling the order"></textarea>
            <button className={style.actionBtn} onClick={cancell}>Cancel</button>
        </div>
    )
}

export default function OrderItem({ order, cancelOrder }) {
    const [track,setTrack] = useState(false)
    const [cancel,setCancel] = useState(false)

    const showTracking = async()=>{
        setTrack(p=>!p)
    }

    useEffect(()=>{
        (order.statusCode==5)?setCancel(false):null
    })
    const showCancel = ()=>{
        setCancel(p=>!p)
    }

    return (
        <div className={style.orderItemContainer}>
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
                    <Status status={order.statusCode} oid={order.o_id}  date={order.placedDate} showTracking={showTracking} cancelOrder={showCancel}/>
                </div>
            </div>
            {(track)?<Track oid={order.o_id} />:null}
           {(cancel)?<ReasonContainer oid={order.o_id} cancelOrder={cancelOrder}/>:null}
        </div>
    )
}