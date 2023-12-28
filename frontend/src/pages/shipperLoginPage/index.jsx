import { useState } from "react"
import LoginForm from "../../components/userComponents/loginForm"
import style from './style.module.css'

export default function ShipperLoginPage(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const loginProps = {
    onLoginClick: async() => {
        const
    },
    onClickHere: () => {
      // setElement(false)
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
      <LoginForm props={loginProps} />
    </div>
  )
}