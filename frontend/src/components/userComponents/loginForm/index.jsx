import React from "react";
import PasswordInput from "../passwordInput";
import style from './style.module.css'
export default function LoginForm({ props }){
    return (
        <div className={style.login}>
            <h2>Login</h2>
            <label htmlFor="">Email/Username</label>
            <input type="text" name="" id="" placeholder="Username" value={props.email} onInput={props.setEmail} />
            <label htmlFor="">Password</label>
            <PasswordInput value={props.password} onInput={props.setPassword} />
            <button onClick={props.onLoginClick}>Login</button>
            <p>Or</p>
            <span onClick={props.onClickHere}>Sign up here</span>
        </div>
    )
}