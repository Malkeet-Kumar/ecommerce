import React, { useContext } from "react";
import style from './style.module.css';
import { FaShoppingCart } from "react-icons/fa";
import {Link} from 'react-router-dom'
import UserContext from "../../../context/userContext";
import CartContext from "../../../context/CartContext";
import { LuIndianRupee } from "react-icons/lu";
export default function CartButton() {
    const {cartTotal,cartItems} = useContext(UserContext)
    return (
        <div className={style.container}>
            <div className={style.items}>{(cartItems>5)?"5+":cartItems}</div>
            <Link to='/cart' className={style.link}>
                <div className={style.inner} title="Cart">
                    <FaShoppingCart color="orangered" />
                    <div style={{ height: "20px", borderLeft: "1px solid black", margin: "0px 5px" }}></div>
                    <span>{cartTotal}<LuIndianRupee fontSize="12px"/></span>
                </div>
            </Link>
        </div>
    )
}