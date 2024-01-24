import CartContainer from "../../containers/cartContainer";
import CartTable from '../../components/userComponents/cartTable'
import CartTotal from '../../components/userComponents/cartTotal'
import { useGetData } from '../../apis/apiCalls'
import { cartUrl, ordersUrl } from "../../apis/apiUrls";
import Loading from '../../containers/loading'
import Error from '../../containers/error'
import { useContext, useState } from "react";
import Alert from "../../components/sweetAlert";
import UserContext from "../../context/userContext";
import style from './style.module.css'
import { LuArrowBigUp, LuArrowBigUpDash, LuCross } from "react-icons/lu";
import { MdOutlineCancel } from "react-icons/md";
import { CART_TITLE } from "../../utils/titles";

export default function Cart() {
    const [isUnauth,isError, error, isLoading, data, setData] = useGetData(cartUrl,localStorage.getItem("token"))
    const { cartItems, cartTotal, setCartTotal, setUserAddresses, setCartItems, userAddresses,user } = useContext(UserContext)
    const [fullname, setFullname] = useState("")
    const [mobile, setMobile] = useState("")
    const [country, setCountry] = useState("")
    const [add_line1, setAdd1] = useState("")
    const [add_line2, setAdd2] = useState("")
    const [pincode, setPincode] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [landmark, setLandMark] = useState("")
    const [address, setAddress] = useState(userAddresses[0])
    const [paymentMethod, setPayment] = useState(null)
    const [showAddForm, setShowAdd] = useState(false)
    const [isPopupVisible, setPopupVisibility] = useState(false)

    const removeCart = (item) => {
        fetch(`${cartUrl}?item=${item.p_id}`, {
            method: "DELETE",
            headers:{
                authorization:localStorage.getItem("token")
            }
        })
            .then((result) => {
                if (result.ok) {
                    setCartTotal(p => p - (item.price * item.quantity))
                    setCartItems(p => p - 1)
                    setData(p => data.filter(e => e.p_id != item.p_id))
                }
            }).catch((err) => {
                Alert({
                    title: "Error Occured",
                    text: err,
                    icon: "error",
                    iconColor: "orangered"
                })
            });
    }

    const FloatingLabelInput = ({ value, placeholder, listener }) => {
        return (
            <div className={style.inputBox}>
                <label>{placeholder}</label>
                <input type="text" value={value} onChange={(e) => { listener(e.target.value) }} />
            </div>
        )
    }

    function placeOrder(newAddress) {
        if (newAddress) {
            if (!paymentMethod) {
                Alert({
                    title: "Choose Payment Method",
                    icon: "warning"
                })
            }
            const add = {
                fullname,
                mobile,
                country,
                add_line1,
                add_line2,
                pincode,
                city,
                state,
                landmark
            }
            setUserAddresses(p=>[...p, add]);
            add.paymentMethod = paymentMethod
            fetch(ordersUrl + `?newAddress=true`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    authorization:localStorage.getItem("token")
                },
                body: JSON.stringify({add})
            })
            .then((result) => {
                if (result.ok) {
                    setCartTotal(0)
                    setCartItems(0)
                    Alert({
                        title:"Order Placed",
                    })
                }
            }).catch((err) => {
                console.log(err);
                Alert({
                    title:"Error Occurred",
                    text:err,
                    icon:"error",
                    iconColor:"orangered"
                })
            })
        } else {
            fetch(ordersUrl, {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    authorization:localStorage.getItem("token")
                },
                body: JSON.stringify({
                    add_id: address,
                    paymentMethod
                })
            })
                .then((result) => {
                    if (result.ok) {
                        setCartTotal(0)
                        setCartItems(0)
                        Alert({
                            title:"Order Placed",
                        })
                    }
                }).catch((err) => {
                    console.log(err);
                    Alert({
                        title:"Error Occurred",
                        text:err,
                        icon:"error",
                        iconColor:"orangered"
                    })
                })
        }
    }

    return (
       <CartContainer>
            {
                (!user.isUser || !user.isLoggedIn)
                ?
                <h1>Please log in to see your cart</h1>
                :
                (cartItems <= 0)
                    ?
                    <h1 style={{ textAlign: "center center", width: "100%" }}>Cart is empty</h1>
                    :
                    (isError)
                        ?
                        <Error err={error} heading="Oops Somthing went wrong." />
                        :
                        (isLoading)
                            ?
                            <Loading />
                            :
                            <>
                                <CartTable carts={data} removeCart={removeCart} />
                                <CartTotal carts={data} onClick={() => setPopupVisibility(p => !p)} />
                                {(isPopupVisible) ? <div className={style.popup}>
                                    <span onClick={() => setPopupVisibility(p => !p)}><MdOutlineCancel /></span>
                                    <select onInput={e => setPayment(e.target.value)}>
                                        <option value="null" selected='true'>----Select Payment method----</option>
                                        <option value="COD">Cash on Delivery</option>
                                    </select>
                                    {(!showAddForm)
                                        ?
                                        <>
                                            <select name="" id="" value={address} onInput={(e) => setAddress(e.target.value)}>
                                                <option value="null" selected='true'>----Select Address----</option>
                                                {userAddresses.map(ad => <option value={ad.add_id}>{ad.fullname}, {ad.mobile}, {ad.addressline1}, {ad.addressline2}, {ad.city}, {ad.pincode}</option>)}
                                            </select>
                                            <button onClick={e => placeOrder(false)}>Choose This and Deliver Here</button>
                                            or
                                        </>
                                        :
                                        <></>
                                    }
                                    {(showAddForm) ? <div className={style.addressForm}>
                                        <div className={style.addressNameMobile}>
                                            <input type="text" className={style.input} value={fullname} onInput={(e) => setFullname(e.target.value)} placeholder="Full Name" />
                                            <input type="text" className={style.input} value={mobile} onInput={e => setMobile(e.target.value)} placeholder="Mobile" />
                                        </div>
                                        <div className={style.addressNameMobile}>
                                            <input type="text" className={style.input} value={country} onInput={e => setCountry(e.target.value)} placeholder="Country" />
                                            <input type="text" className={style.input} value={state} onInput={e => setState(e.target.value)} placeholder="State" />
                                        </div>
                                        <input type="text" className={style.textArea} value={add_line1} onInput={e => setAdd1(e.target.value)} placeholder="Address Line 1" />
                                        <input type="text" className={style.textArea} value={add_line2} onInput={e => setAdd2(e.target.value)} placeholder="Address Line 2" />
                                        <div className={style.addressNameMobile}>
                                            <input type="text" className={style.input} value={city} onInput={e => setCity(e.target.value)} placeholder="City" />
                                            <input type="text" className={style.input} value={pincode} onInput={e => setPincode(e.target.value)} placeholder="Pincode" />
                                        </div>
                                        <div className={style.addressNameMobile}>
                                            <input type="text" className={style.input} value={landmark} onInput={e => setLandMark(e.target.value)} placeholder="Landmark" />
                                            <button className={style.savenDeliver} onClick={(e) => placeOrder(true)}>Save This And Deliver Here</button>
                                        </div>
                                        <button onClick={() => { setShowAdd(p => !p) }} style={{ backgroundColor: "crimson", border: "none", height: "25px", width: "30px", borderRadius: "5px" }} ><LuArrowBigUpDash color="white" /></button>
                                    </div> : <button onClick={() => { setShowAdd(p => !p) }}>+Add New Address</button>}
                                </div> : <></>}
                            </>
            }
        </CartContainer>
    )
}