import style from './style.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg'
import { useContext } from 'react'
import SellerContext from '../../../context/sellerContext'
import { sellerLogoutUrl } from '../../../apis/apiUrls'
import Alert from '../../sweetAlert'
import { defaultSeller } from '../../../utils/defaultStateVariables'

export default function Header(props) {
    const { seller, setSeller } = useContext(SellerContext)
    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setSeller(defaultSeller)
    }

    return (
        <div className={style.header}>
            <div className={style.upper}>
                <div className={style.upperInner}>
                    <h3>CelestialCart</h3>
                    <div className={style.upperInnerRight}>
                        <span className={style.profile}>Welcome, {seller.name}  <CgProfile className={style.profileIcon} /></span>
                    </div>
                </div>
            </div>
            <div className={style.lower}>
                <div className={style.lowerInner}>
                    <Link to="/seller/home">Home</Link>
                    <Link to="/seller/inventory">Inventory</Link>
                    <Link to="/seller/orders">Orders</Link>
                    <Link to="/seller/reports">Reports</Link>
                    {
                        (seller.isSeller && seller.isLoggedIn)
                            ?
                            <Link onClick={logout}>Logout</Link>
                            :
                            <Link to="/seller/login">Login</Link>
                    }
                </div>
            </div>
        </div>
    )
}