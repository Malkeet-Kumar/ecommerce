import style from './style.module.css'
import SearchBar from "../searchbar/index";
import CartButton from "../cart";

import { logoutUrl } from '../../../apis/apiUrls';

import { Link, Navigate } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import { BiLogIn, BiLogOut } from "react-icons/bi";

import { useContext, useEffect, useState } from "react";
import UserContext from '../../../context/userContext';
import Alert from '../../sweetAlert';
import CartContext from '../../../context/CartContext';
import { defaultUser } from '../../../utils/defaultStateVariables';

export default function Header() {
  const { user, setUser, setCartTotal, setCartItems  } = useContext(UserContext)
  const [header, setHeader] = useState(style.header)

  const listenScrollEvent = (event) => {
    if (window.scrollY < 20) {
      return setHeader(style.header)
    } else if (window.scrollY > 20) {
      return setHeader(style.header1)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
    return () =>
      window.removeEventListener('scroll', listenScrollEvent);
  }, []);

  const logout = () => {
    console.log("Logout");
    fetch(logoutUrl, {
      method: "get",
      credentials: "include"
    })
      .then((result) => {
        setUser(defaultUser)
        setCartItems(0)
        setCartTotal(0)
        // set
        return <Navigate to="/login" />
      }).catch((err) => {
        Alert({
          title: "Somthing went wrong",
          text: err,
          icon: "error",
          iconColor: "red"
        })
      });
  }

  return (
    <>
      <div className={header}>
        <div className={style.upper}>
          <div className={style.upperInner}>
            <h3>CelestialCart</h3>
            <div className={style.upperInnerRight}>
              {/* <SearchBar /> */}
              <CartButton />
              <span className={style.profile}>Welcome, {user.fname} <CgProfile className={style.profileIcon} /></span>
            </div>
          </div>
        </div>
        <div className={style.lower}>
          <ul>
            <li><Link to='/home' className={style.link}>Home</Link></li>
            <li><Link to='/shop' className={style.link}>Shop</Link></li>
            <li><Link to='/orders' className={style.link}>My Orders</Link></li>
            <li><Link to='/seller' className={style.link}>Sell</Link></li>
            <li>
              {
                (user.isLoggedIn)
                  ?
                  <div className={style.link} onClick={logout}><BiLogOut className={style.logIcon} /> Logout</div>
                  :
                  <Link to='/login' className={style.link}><BiLogIn className={style.logIcon} /> Login</Link>
              }
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}