import style from './style.module.css'
import { LuDollarSign, LuIndianRupee } from "react-icons/lu"
import { useState, useContext } from "react";
import Alert from '../../sweetAlert'
import UserContext from "../../../context/userContext";
import { cartUrl } from "../../../apis/apiUrls";

const CartItem = ({ item, removeCart }) => {
    const [subtotal, setSubtotal] = useState(item.price*item.quantity)
    const [quantity, setQuantity] = useState(item.quantity)
    const {user, cartTotal, cartItems,setUser, setCartTotal, userAddresses, setCartItems} =useContext(UserContext)
    const increaseQuant = (id) => {
        if (quantity >= 5) {
            Alert({ icon: "error", title: "Limit Reached", text: "At most 5 items can be purchased in one time" })
        } else {
            fetch(cartUrl+"?item="+id+"&op=increment",{
                method:"PATCH",
                headers:{
                    authorization:localStorage.getItem("token")
                }
            })
            .then((result) => {
                if(result.ok){
                    item.quantity++
                    setCartTotal(p=>p+item.price)
                    setQuantity(p=>p+1)
                    setSubtotal(p=>p+item.price)
                }
            }).catch((err) => {
                Alert({
                    title:"Error Occured",
                    text:err,
                    icon:"error",
                    iconColor:"orangered"
                })
            });
        }
    }
    
    const decreaseQuant = (id) => {
        if (quantity <= 1) {
            Alert({ 
                icon: "warning", 
                title: "Limit reached", 
                text: "At least 1 quant is needed to purchase" 
            })
        } else {
            fetch(cartUrl+"?item="+id+"&op=decrement",{
                method:'PATCH',
                headers:{
                    authorization:localStorage.getItem("token")
                }
            })
            .then((result) => {
                if(result.ok){
                    item.quantity--
                    setCartTotal(p=> p - item.price)
                    setQuantity(p=> p - 1)
                    setSubtotal(p=> p-item.price)
                }
            }).catch((err) => {
                Alert({
                    title:"Error Occured",
                    text:err,
                    icon:"error",
                    iconColor:"orangered"
                })
            });
        }
    }

    let outOfStock = false
    if (item.stock <= 0) {
        outOfStock = true
    }

    return (
        <>
            <div className={style.CartItem}>
                <div className={style.imgBx}>
                    <img src={item.image} alt={item.productName} />
                </div>
                <div className={style.details}>
                    <p className={style.productName}>{item.name}</p>
                    <p className={style.sellerName}>{item.category}</p>
                    {(outOfStock) ? <span className={style.outOfStock}>Out Of Stock</span> : <span className={style.sellerName}>{item.buisness}</span>}
                    {(!outOfStock) ? <span className={style.subtotal}><LuIndianRupee fontSize={"16px"} />{subtotal}</span> : <></>}
                </div>
            </div>
            <div>
                <div className={style.btnContainer}>
                    {(outOfStock)?<div></div>:<div className={style.cartPlusMinus}>
                        <>
                            <button className={style.cartQuantBtn} onClick={()=>increaseQuant(item.p_id)}>+</button>
                            <span key={"quant-" + item.productId}>{quantity}</span>
                            <button className={style.cartQuantBtn} onClick={()=>decreaseQuant(item.p_id)}>-</button>
                        </>
                    </div>}
                    <button className={style.commonBtn} onClick={()=>{removeCart(item)}} >Remove</button>
                </div>
            </div>
        </>
    )
}



export default function CartTable({ carts, removeCart}) {
    const { user, userAddresses } = useContext(UserContext)
    return (
        <div className={style.container} >
            <div className={style.addressContainer} >
                <div className={style.left} >
                    {(userAddresses.length>0)?<span >Deliver To: {userAddresses[0].fullname}, {userAddresses[0].mobile}, {userAddresses[0].addressline1}, {userAddresses[0].addressline2}, {userAddresses[0].city}, {userAddresses[0].pincode}</span>:<span>Deliver to: {user.fname} {user.lname}</span>}
                    <span >{user.address}</span>
                </div>
                {/* <div className={style.right} >
                    <button className={style.commonBtn} >Change</button>
                </div> */}
            </div>
            <div className={style.table} >
                {carts.map(item => <CartItem item={item} key={item.productId} removeCart={removeCart} />)}
            </div>
            {/* <div className={style.addressContainer} >
                <div className={style.left} >
                    <span >Deliver To: {user.fname}</span>
                    <span >{user.address}</span>
                </div>
                <div className={style.right} >
                    <button className={style.commonBtn} >Change</button>
                </div>
            </div> */}
        </div>
    )
}
