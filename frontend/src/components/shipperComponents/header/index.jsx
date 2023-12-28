import { ProfileOutlined } from '@ant-design/icons'
import style from './style.module.css'
import { MdPersonOutline, MdPersonPinCircle } from 'react-icons/md'
import {Link} from 'react-router-dom'
import { CgProfile } from 'react-icons/cg'

export default function Header(props){
    return (
        <div className={style.header}>
            <div className={style.innerHeader}>
                <h2>CelestialCart</h2>
                <p>{"Shipper"} <CgProfile style={{marginLeft:"5px"}} /></p>
            </div>
            <div className={style.lower}>
                <Link to="home">Home</Link>
                <Link to="onboarding">OnBoarding</Link>
                <Link to="dispatched">Dispatched</Link>
                {/* <Link to="out">Out For Delivery</Link> */}
            </div>
        </div>
    )
}