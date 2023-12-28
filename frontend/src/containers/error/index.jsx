import style from './style.module.css'
import {MdOutlineErrorOutline } from 'react-icons/md'
export default function Error({err,heading}){
    return (
        <div className={style.container}>
            <MdOutlineErrorOutline color='red' fontSize={"100px"}/>
            <h2>{heading}</h2>
            <p>{err.name}</p>
            <p>{err.code}</p>
            <p>{err.message}</p>
        </div>
    )
}