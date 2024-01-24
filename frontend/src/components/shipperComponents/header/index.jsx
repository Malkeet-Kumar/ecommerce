import { ProfileOutlined } from '@ant-design/icons'
import style from './style.module.css'
import { MdPersonOutline, MdPersonPinCircle } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg'
import { useContext } from 'react'
import ShipperConext from '../../../context/shipperContext'
import { defaultShipper } from '../../../utils/defaultStateVariables'
import { useNavigate } from 'react-router-dom'

export default function Header(props) {
    const { user, setUser } = useContext(ShipperConext)
    const navigate = useNavigate()
    const logout = ()=>{
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setUser(defaultShipper)
        navigate("/shipper/login")
    }
    return (
        <div className={style.header}>
            <div className={style.innerHeader}>
                <h2>CelestialCart</h2>
                {(user.isLoggedIn) ? <p><span onClick={logout} style={{marginRight:"10px",padding:"5px",border:"1px solid white",userSelect:"none",cursor:"pointer"}}>Logout</span> {user.name} <CgProfile style={{ marginLeft: "5px" }} /></p> : null}
            </div>
            {
                (user.isLoggedIn && user.isShipper) ?
                    <div className={style.lower}>
                        <Link to="onboarding">OnBoarding</Link>
                        <Link to="dispatched">Dispatched</Link>
                        <Link to="deliverermgmt">Manage Deliverers</Link>
                    </div>
                    : (user.isLoggedIn &&  user.isDeliver)?
                    <div className={style.lower}>
                        <Link to="deliveries">Deliveries</Link>
                    </div>
                    :null
            }
        </div>
    )
}