import Header from '../components/sellerComponents/header/index'
import { Outlet } from 'react-router-dom'
import SellerAuthState from '../states/sellerAuthState'
import CartState from '../states/CartState'
import { useContext } from 'react'
import SellerContext from '../context/sellerContext'

const Child = (props)=>{
  const {seller} = useContext(SellerContext)
  return(
   <>
     {
      (seller.isSeller)?
      <CartState>
        <Header />
        <Outlet />
      </CartState>:
      <h1>Unauthorised access</h1>
    }
   </>
  )
}

function SellerApp() {
  return (
    <SellerAuthState>
      <Child/>
    </SellerAuthState>
  )
}

export default SellerApp
