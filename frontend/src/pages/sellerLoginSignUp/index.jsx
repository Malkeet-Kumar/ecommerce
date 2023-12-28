import React, { useState, useEffect, useContext } from "react";
import style from './style.module.css'
import { LOGIN_TITLE, SIGNUP_TITLE } from '../../utils/titles'
import { sellerLoginUrl } from "../../apis/apiUrls";
import SellerContext from "../../context/sellerContext";
import LoginForm from "../../components/userComponents/loginForm";
import Alert from "../../components/sweetAlert";
import SignupSeller from '../../components/sellerComponents/signupForm'
import { helix } from 'ldrs'
import { useNavigate } from "react-router-dom";
helix.register("my-loader")


const validateEmail = (e) => {
    const mailRegx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return String(e.target.value).toLowerCase().match(mailRegx)
};

export default function Login() {

    const {setSeller,seller} = useContext(SellerContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLogin, setElement] = useState(true) //switch for login signup

    //signup props
    const [fname,setFname] = useState("")
    const [lname,setLname] = useState("")
    const [buisness,setBname] = useState("")
    const [address,setAddress] = useState("")
    const [city,setCity] = useState("")
    const [pincode,setPincode] = useState("")
    const [country,setCountry] = useState("")
    const [gst,setGst] = useState("")
    const [pan,setPan] = useState("")
    const [account,setAccount] = useState("")
    const [passbook,setPassbook] = useState({name:""})
    const [panFile,setPanFile] = useState({name:""})
    const [aadharFile,setAadharFile] = useState({name:""})
    const [storeImage,setStoreImage] = useState({name:""})

    const nav =  useNavigate()

    useEffect(() => {
        (isLogin) ? document.title = LOGIN_TITLE : document.title = SIGNUP_TITLE
    })

    const reqBody = {
        email: email,
        password: password
    }
    
    const valuesArray = [fname,lname,email,password,buisness,address,country,city,pincode,gst,account,pan,passbook,aadharFile,panFile,storeImage]
    const keysArray = ["fname","lname","email","password","buisness","address","country","city","pincode","gst","account","pan","passbook","aadharFile","panFile","storeImage"]
    const formData = new FormData()
    valuesArray.forEach((val,i)=>formData.append(keysArray[i],val));
    

    const loginProps = {
        onLoginClick: () => {
            fetch(sellerLoginUrl, {
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
                    if(u){
                        setSeller({...u, isSeller:true,isLoggedIn:true});
                        localStorage.setItem("user",JSON.stringify({name:u.name,isSeller:true,isLoggedIn:true}))
                        localStorage.setItem("token",u.authToken)
                       nav("/seller/inventory")
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
            setElement(p=>!p)
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
        onClickHere: ()=>{
            setElement(p=>!p)
        },

        registerSeller:()=>{
            console.log(formData);
            fetch("http://127.0.0.1:8000/api/seller/signup",{
                method:"POST",
                credentials:'include',
                body:formData
            })
            .then((result) => {
                if(result.ok){
                    Alert({
                        title:"Submitted",
                        text:"Your request has been submitted. We will let you know through Email, after reviewing your application."
                    })
                    setTimeout(()=>{
                        setElement(p=>!p)
                    },2000)
                } else if(result.status==304){
                    Alert({
                        title:"Email exists already",
                        icon:"warning"
                    })
                }
            }).catch((err) => {
                Alert({
                    title:"Error Occured",
                    text:err,
                    icon:"error",
                    iconColor:"orangered"
                })
            });
        },

        setFname:e=>setFname(e.target.value),
        setLname:e=>setLname(e.target.value),
        setEmail:e=>setEmail(e.target.value),
        setPassword:e=>setPassword(e.target.value),
        setBname:e=>setBname(e.target.value),
        setAddress:e=>setAddress(e.target.value),
        setCity:e=>setCity(e.target.value),
        setPincode:e=>setPincode(e.target.value),
        setCountry:e=>setCountry(e.target.value),
        setGst:e=>setGst(e.target.value),
        setPan:e=>setPan(e.target.value),
        setAccount:e=>setAccount(e.target.value),
        setPassbook:e=>setPassbook(e.target.files[0]),
        setPanFile:e=>{
            console.log(panFile);
            setPanFile(e.target.files[0])
        },
        setAadharFile:e=>setAadharFile(e.target.files[0]),
        setStoreImage:e=>setStoreImage(e.target.files[0]),

        fname:fname,
        lname:lname,
        email:email,
        password:password,
        buisness:buisness,
        address:address,
        city:city,
        pincode:pincode,
        country:country,
        gst:gst,
        pan:pan,
        account:account
    }
    return (
        <div className={style.container}>
            {
            (isLogin)
            ?
            <LoginForm props={loginProps} />
            :
            <SignupSeller props={signupProps}/>
        }
        </div>
    )
}