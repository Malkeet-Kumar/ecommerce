import React, { useContext, useState } from "react";
import style from './style.module.css'
import { LuDollarSign, LuIndianRupee } from "react-icons/lu"
import { BiSolidDetail } from "react-icons/bi";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { FaCartPlus } from "react-icons/fa";
import axios from "axios";
import { cartUrl } from "../../../apis/apiUrls";
import Alert from "../../sweetAlert";
import { Navigate } from "react-router-dom";
import UserContext from "../../../context/userContext";

export default function Product({ buyNow, viewDetails, product }) {
    const { cartTotal, setCartTotal, cartItems, setCartItems } = useContext(UserContext)
    const [isError, setErrorStatus] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [err, setError] = useState("")
    const [response, setProducts] = useState([])

    const [popup, setPopup] = useState(false)
    const [popupDetails, setPopupDetails] = useState({})

    const PopupModal = ({ item, onClick }) => {
        return (
            <div className={style.overlay}>
                <div className={style.popup}>
                    <div className={style.popupLeft}>
                        <div className={style.pimgBx}>
                            <img src={(item.image.includes("http"))?item.image:"http://127.0.0.1:8000/uploads/productImages/"+item.image} alt={item.name} />
                        </div>
                    </div>
                    <div className={style.popupRight}>
                        <h3>{item.name}</h3>
                        <h3>$ {item.price}</h3>
                        <p>{item.category}</p>
                        <p>{item.buisness}</p>
                        <p>{item.description}</p>
                    </div>
                    <button className={style.closeView} onClick={onClick}>x</button>
                </div>
            </div>
        )
    }

    const addToCart = async (id, price) => {
        try {
            const res = await fetch(`${cartUrl}?item=${id}`, {
                method: "POST",
                headers:{
                    authorization:localStorage.getItem("token")
                }
            })
            console.log(res);
            if (res.status == 401) {
                Alert({
                    title: "Please log in first",
                    text: "You have to login to your account to add this product to cart",
                    icon: "warning",
                })
            } else if (res.status == 304) {
                Alert({
                    title: "Product already added to cart",
                    icon: "warning"
                })
                console.log(res);
            } if (res.status == 200) {
                setCartTotal(p => p + price)
                setCartItems(p => p + 1)
                Alert({
                    title: "Product Addded to Cart",
                })
            }
        } catch (error) {
            Alert({
                title: "error",
                text: error
            })
        }
    }

    return (
        <>
            {(popup) ? <PopupModal item={popupDetails} onClick={() => { setPopup(false) }} /> : <></>}
            <div className={style.productDiv}>
                <div className={style.imgBx}>
                    <img src={product.image} alt={product.name} />
                    {
                        (product.stock > 0)
                            ?
                            <ul className={style.actions}>
                                <li onClick={() => addToCart(product.p_id, product.price)}>
                                    <FaCartPlus />
                                    <span>Add to Cart</span>
                                </li>
                                {/* <li onClick={buyNow}>
                                    <BiSolidPurchaseTag />
                                    <span>Buy Now</span>
                                </li> */}
                                <li onClick={() => {
                                    setPopupDetails(product)
                                    setPopup(true)
                                }}>
                                    <BiSolidDetail />
                                    <span>View Details</span>
                                </li>
                            </ul>
                            :
                            <div className={style.outOfStock}></div>
                    }
                </div>
                <div className={style.details}>
                    <div className={style.p} title={product.productName}>{product.name}</div>
                    <h2><LuIndianRupee className={style.rupee} />{product.price}</h2>
                </div>
            </div>
            {/* <viewDetailsPopUp item={product} /> */}
        </>
    )
}