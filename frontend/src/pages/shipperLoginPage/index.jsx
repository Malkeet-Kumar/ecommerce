import { useContext, useState } from "react"
import PasswordInput from '../../components/userComponents/passwordInput/index'
import style from './style.module.css'
import { delivery, deliveryLogin, shipperLogin } from "../../apis/apiUrls"
import { Navigate, useNavigate } from "react-router-dom"
import Alert from "../../components/sweetAlert"
import ShipperConext from "../../context/shipperContext"

const ShipperLoginForm = ({props})=>{
  return (
    <div className={style.login}>
            <h2>Shipper Login</h2>
            <label htmlFor="">Email/Username</label>
            <input type="text" name="" id="" placeholder="Username" value={props.email} onInput={props.setEmail} />
            <label htmlFor="">Password</label>
            <PasswordInput value={props.password} onInput={props.setPassword} />
            <button onClick={props.onLoginClick}>Login</button>
            <p>Or</p>
            <span onClick={props.onClickHere}>Login as DeliveryPerson</span>
        </div>
  )
}

const DLoginForm = ({props})=>{
  return (
    <div className={style.login}>
            <h2>Login Deliverer</h2>
            <label htmlFor="">Email/Username</label>
            <input type="text" name="" id="" placeholder="Username" value={props.email} onInput={props.setEmail} />
            <label htmlFor="">Password</label>
            <PasswordInput value={props.password} onInput={props.setPassword} />
            <button onClick={props.onLoginClick}>Login</button>
            <p>Or</p>
            <span onClick={props.onClickHere}>Login as Shipper</span>
        </div>
  )
}

export default function ShipperLoginPage(props) {
  const navigator = useNavigate()

  const {user, setUser} = useContext(ShipperConext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [shipper,setShipper] = useState(true)
  const loginPropsShipper = {
    onLoginClick: async() => {
        const res = await fetch(shipperLogin,{
          method:"POST",
          headers:{
            'content-type':'application/json',
          },
          body:JSON.stringify({email,password})
        })
        if(res.ok){
          const d = await res.json()
          setUser(d.user)
          localStorage.setItem("user",JSON.stringify(d.user))
          localStorage.setItem("token",d.authToken)
          return navigator("/shipper/onboarding")
        } else {
          Alert({
            title:"Invalid credentials",
            icon:"error",
            iconColor:"red"
          })         
        }
    },
    onClickHere: () => {
      setShipper(p=>!p)
    },
    setEmail: (e) => {
      setEmail(p => e.target.value)
    },
    setPassword: (e) => { setPassword(p => e.target.value) },
    email: email,
    password: password,
  }
  const loginPropsDeliver = {
    onLoginClick: async() => {
        const res = await fetch(deliveryLogin,{
          method:"POST",
          headers:{
            'content-type':'application/json',
          },
          body:JSON.stringify({email,password})
        })
        if(res.ok){
          const d = await res.json()
          setUser(d.user)
          localStorage.setItem("user",JSON.stringify(d.user))
          localStorage.setItem("token",d.authToken)
          return navigator("/shipper/deliveries")
        } else {
          Alert({
            title:"Invalid credentials",
            icon:"error",
            iconColor:"red"
          })         
        }
    },
    onClickHere: () => {
      setShipper(p=>!p)
    },
    setEmail: (e) => {
      setEmail(p => e.target.value)
    },
    setPassword: (e) => { setPassword(p => e.target.value) },
    email: email,
    password: password,
  }
  return (
    <div className={style.container}>
      {
        (user.isLoggedIn)?<Navigate to="/shipper/onboarding" />:(shipper)?<ShipperLoginForm props={loginPropsShipper} />:<DLoginForm props={loginPropsDeliver}/>
      }
    </div>
  )
}