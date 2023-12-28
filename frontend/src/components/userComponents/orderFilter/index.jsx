import React, { useState } from "react";
import style from './style.module.css'
export default function OrderFilter(){
    const [cls, setClass] = useState(style.inactive)
    const filters = ["Delivered","Cancelled","On the way"]
    let isActive = false
    return (
        <div className={style.filter}>
            <h3>Order Status</h3>
            <div className={style.inner}>
                {
                    filters.map(filter=>{
                        return <p className={style.inactive} onClick={(e)=>{
                            if(e.target.classList.contains(style.active)){
                                e.target.classList.remove(style.active); 
                                e.target.classList.add(style.inactive)
                            } else {
                                e.target.classList.remove(style.inactive); 
                                e.target.classList.add(style.active)
                            }
                        }} key={filter}>{filter}</p>
                    })
                }
               
            </div>
        </div>
    )
}