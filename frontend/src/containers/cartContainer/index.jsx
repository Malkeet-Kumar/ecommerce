import React, { useEffect } from "react";
import style from './style.module.css'
import { CART_TITLE } from "../../utils/titles";

export default function CartContainer(props) {
    useEffect(()=>{
        document.title = CART_TITLE
    })
    return <div className={style.container}>{props.children}</div>
}