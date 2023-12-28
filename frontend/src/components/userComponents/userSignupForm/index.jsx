import React from "react"
import style from './style.module.css'
import PasswordInput from "../passwordInput"
export default function SignupForm({ props }){
    return (
        <div className={style.signup}>
            <h2>SignUp</h2>
            <label htmlFor="">First Name</label>
            <input type="text" name="" id="" placeholder="First Name" value={props.fname} onInput={props.setFname} />
            <label htmlFor="">Last Name</label>
            <input type="text" name="" id="" placeholder="Last Name" value={props.lname} onInput={props.setLname} />
            <label htmlFor="">Email</label>
            <input type="text" name="" id="" placeholder="Email" value={props.email} onInput={props.setEmail} />
            <label htmlFor="">Password</label>
            <PasswordInput value={props.password} onInput={props.setPassword} />
            <label htmlFor="" style={{marginTop:"15px"}}>Mobile</label>
            <input type="text" name="" id="" value={props.mobile} onInput={props.setMobile} placeholder="Mobile number"/>
            <button onClick={props.onSignupClick}>Sign Up</button>
            <p>Or</p>
            <span onClick={props.onClickHere}>Login here</span>
        </div>
    )
}
