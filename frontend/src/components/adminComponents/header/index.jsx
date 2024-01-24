import { useContext } from 'react'
import style from './style.module.css'
import AdminContext from '../../../context/adminContext'
import { CgProfile } from 'react-icons/cg'
import {Link, useNavigate} from 'react-router-dom'
import { defaultAdmin } from '../../../utils/defaultStateVariables'
import {message} from 'antd'

export default function Header(){
    const {user, setUser} = useContext(AdminContext)
    const navigator = useNavigate()

    const logout = () =>{
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setUser(defaultAdmin)
        message.success("Logged out")  
        navigator("login")
    }

    return (
        <div className={style.headerContainer}>
            <div className={style.upper}>
                <h1>CelestialCart</h1>
                {(!user.isLoggedIn)?<p className={style.user}>{user.name} <CgProfile style={{marginLeft:"5px"}}/></p>:null}
            </div>
            <div className={style.lower}>
                <Link to="allproducts">All Products</Link>
                <Link to="products">Approve Products</Link>
                <Link to="sellers">Approve Sellers</Link>
                <Link to="shipper">Create Shipper</Link>
                {(user.isLoggedIn)?<span onClick={logout} className={style.logoutBtn}>Logout</span>:<Link to="login">Login</Link>}
            </div>
        </div>
    )
}