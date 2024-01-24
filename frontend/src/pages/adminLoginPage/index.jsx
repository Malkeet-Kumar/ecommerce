import style from './style.module.css'
import PasswordInput from '../../components/userComponents/passwordInput'
import { useContext, useEffect, useState } from 'react'
import { adminAllProducts, adminLogin, adminProductReq, sellerDispatchCenter } from '../../apis/apiUrls'
import AdminContext from '../../context/adminContext'
import { message } from 'antd'
import Alert from '../../components/sweetAlert'
import {Navigate, useNavigate} from 'react-router-dom'

const LoginForm = ({props})=>{
    return (
        <div className={style.login}>
            <h2>Admin Login</h2>
            <label htmlFor="">Email/Username</label>
            <input type="text" name="" id="" placeholder="Username" value={props.email} onInput={props.setEmail} />
            <label htmlFor="">Password</label>
            <PasswordInput value={props.password} onInput={props.setPassword} />
            <button onClick={props.onLoginClick}>Login</button>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
        </div>
    )
}

export default function AdminLoginPage(){

    const {user,setUser} = useContext(AdminContext)
    const navigate = useNavigate()

    useEffect(()=>{
        fetch(adminAllProducts,{
            headers:{
                authorization:localStorage.getItem("token")
            }
        })
    })

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const login = async()=>{
        try {
            const res = await fetch(adminLogin,{method:"POST",headers:{'content-type':'application/json'},body:JSON.stringify({email,password})})
            if(res.ok){
                const data = await res.json()
                localStorage.setItem("token",data.authToken)
                localStorage.setItem("user",JSON.stringify(data.user))
                setUser(data.user)
                message.success("Logged in")
                navigate("/admin/allproducts")
            } else if(res.status==404){
                Alert({
                    title:"User not found",
                    text:"",
                    icon:"warning"
                })
            } else if(res.status==401){
                Alert({
                    title:"Invalid Password",
                    text:"Entered password is wrong",
                    icon:"warning"
                })
            } else {
                message.warning("Something went wrong")
            }
        } catch (error) {
            Alert({
                title:"Error Occured",
                text:error,
                icon:"error",
                iconColor:"red"
            })
        }
    }
    const loginProps ={
        email,
        password,
        setEmail:(e)=>setEmail(e.target.value),
        setPassword:(e)=>setPassword(e.target.value),
        onLoginClick:login
    }

    return (
        <div className={style.container}>
            {(user.isLoggedIn)?<Navigate to="/admin/allproducts"/>:<LoginForm props={loginProps}/>}
        </div>
    )
}