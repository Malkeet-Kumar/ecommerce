import React, { useState, useEffect, useContext } from "react";
import style from './style.module.css'
import { LOGIN_TITLE, SIGNUP_TITLE } from '../../utils/titles'
import Alert from "../../components/sweetAlert";
import { loginUrl, singupUrl } from "../../apis/apiUrls";
import LoginForm from "../../components/userComponents/loginForm";
import SignupForm from '../../components/userComponents/userSignupForm'
import UserContext from "../../context/userContext";
import { helix } from 'ldrs'
import { Navigate } from "react-router-dom";
import CartContext from "../../context/CartContext";
import { message } from "antd";
helix.register("my-loader")


const validateEmail = (e) => {
    const mailRegx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return String(e.target.value).toLowerCase().match(mailRegx)
};

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mobile, setMobile] = useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")

    const [isLogin, setElement] = useState(true) //switch for login signup

    useEffect(() => {
        (isLogin) ? document.title = LOGIN_TITLE : document.title = SIGNUP_TITLE
    })

    const { setUser, setCartTotal, setCartItems, user, userAddresses, cartItems, cartTotal, setUserAddresses } = useContext(UserContext)

    const reqBody = {
        email: email,
        password: password
    }


    const loginProps = {
        onLoginClick: () => {
            fetch(loginUrl, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(reqBody),
                mode: 'cors',
                credentials: 'include'
            })
                .then(res => {
                    if (res.status == 404) {
                        Alert({
                            title: "User Not Found",
                            text: "Looks like this is email is not registered with.",
                            icon: "warning",
                        })
                        return
                    } else if (res.status == 401) {
                        Alert({
                            title: "Invalid Password",
                            text: "",
                            icon: "warning",
                        })
                        return
                    } else {
                        return res.json()
                    }
                })
                .then((u) => {
                    if (u) {
                        message.success("Logged in successfuly")
                        setUser({ ...u.user, isLoggedIn: true })
                        setCartItems(u.cartItems)
                        setCartTotal(u.cartTotal)
                        setUserAddresses(u.addresses)
                        localStorage.setItem("token", u.authToken)
                        localStorage.setItem("user", JSON.stringify(u))
                    }
                }).catch((err) => {
                    Alert({
                        title: "Error Occured",
                        text: err,
                        icon: "error",
                        iconColor: "orangered"
                    })
                });
        },
        onClickHere: () => {
            setElement(false)
        },
        setEmail: (e) => {
            validateEmail(e)
            setEmail(p => e.target.value)
        },
        setPassword: (e) => { setPassword(p => e.target.value) },
        email: email,
        password: password,
    }

    const signupProps = {
        onClickHere: () => {
            setElement(true)
        },
        onSignupClick: async () => {
            const body = {
                fname: fname,
                lname: lname,
                email: email,
                password: password,
                mobile: mobile
            }
            const res = await fetch(singupUrl, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(body),
                mode: 'cors',
                credentials: 'include'
            })
            const u = await res.json()
            console.log(u);
        },
        setFname: (e) => {
            setFname(p => e.target.value)
        },
        setLname: (e) => {
            setLname(p => e.target.value)
        },
        setMobile: (e) => {
            setMobile(p => e.target.value)
        },
        setEmail: (e) => {
            setEmail(p => e.target.value)
        },
        setPassword: (e) => {
            setPassword(p => e.target.value)
        },
        email: email,
        password: password,
        mobile: mobile,
        fname: fname,
        lname: lname,
    }


    return (
        <div className={style.container}>
            {(user.isLoggedIn && user.isUser) ? <Navigate to="/home" /> : (isLogin) ? <LoginForm props={loginProps} /> : <SignupForm props={signupProps} />}
        </div>
    )
}