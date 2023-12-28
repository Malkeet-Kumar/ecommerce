import { useState } from 'react'
import style from './style.module.css'
import Alert from '../../sweetAlert'
import {Link} from 'react-router-dom'
import PasswordInput from '../../userComponents/passwordInput'

export default function SignupSeller({props}){
    const [page,setPage] = useState(0)
    return (
        <div className={style.container}>
            <div className={style.status}>
                {
                    (page==0)
                    ?
                    <label htmlFor="">Personal Details</label>
                    :
                    (page==1)
                    ?                    
                    <label htmlFor="">Buisness Details</label>
                    :
                    (page==2)
                    ?
                    <label htmlFor="">Financial Details</label>
                    :
                    (page==3)
                    ?
                    <label htmlFor="">Documents Details</label>
                    :
                    <></>
                }
            </div>
            {
                (page==0)
                ?
                <div className={style.step}>
                    <input type="text" value={props.fname} onInput={props.setFname} placeholder='First Name'/>
                    <input type="text" value={props.lname} onInput={props.setLname} placeholder='Last Name'/>
                    <input type="text" value={props.email} onInput={props.setEmail} placeholder='Email'/>
                    <PasswordInput onInput={props.setPassword} value={props.password} />
                </div>
                :
                (page==1)
                ?
                <div className={style.step}>
                    <input type="text" value={props.buisness} onInput={props.setBname} placeholder='Buisness Name'/>
                    <input type="text" value={props.address} onInput={props.setAddress} placeholder='Address'/>
                    <input type="text" value={props.city} onInput={props.setCity} placeholder='City'/>
                    <input type="text" value={props.pincode} onInput={props.setPincode} placeholder='Pincode'/>
                </div>
                :
                (page==2)
                ?
                <div className={style.step}>
                    <input type="text" value={props.country} onInput={props.setCountry} placeholder='Country'/>
                    <input type="text" value={props.gst} onInput={props.setGst} placeholder='Gst Number'/>
                    <input type="text" value={props.pan} onInput={props.setPan} placeholder='Pan Number'/>
                    <input type="text" value={props.account} onInput={props.setAccount} placeholder='Account Number'/>
                </div>
                :
                (page==3)
                ?
                <div className={style.step}>
                    <div className={style.fileInput}>
                        <label htmlFor="">Passbook: </label>
                        <input type="file" onInput={props.setPassbook}/>
                    </div>
                    <div className={style.fileInput}>
                        <label htmlFor="">Pan Card: </label>
                        <input type="file" onInput={props.setPanFile}/>
                    </div>
                    <div className={style.fileInput}>
                        <label htmlFor="">Aadhar Card: </label>
                        <input type="file" onInput={props.setAadharFile}/>
                    </div>
                    <div className={style.fileInput}>
                        <label htmlFor="">Store Image: </label>
                        <input type="file" onInput={props.setStoreImage}/>
                    </div>
                </div>
                :
                <></>
            }
            <div className={style.controls}>
                {
                    (page!=0)
                    ?
                    <button onClick={e=>setPage(p=>p-1)} className={style.prevBtn}>Prev</button>
                    :
                    <></>
                }
                {
                    (page<3)
                    ?
                    <button onClick={e=>setPage(p=>p+1)} className={style.nextBtn}>Next</button>
                    :
                    <></>
                }
                {
                    (page==3)
                    ?
                    <button onClick={e=>{props.registerSeller()}} className={style.nextBtn}>Submit</button>
                    :
                    <></>
                }
            </div>
            <div className={style.footer}>
                <p>Or</p>
                <h4 onClick={props.onClickHere}>Login Here</h4>
            </div>
        </div>
    )
}