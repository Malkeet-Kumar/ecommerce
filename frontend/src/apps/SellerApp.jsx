import Header from '../components/sellerComponents/header/index'
import { Outlet } from 'react-router-dom'
import SellerAuthState from '../states/sellerAuthState'
import CartState from '../states/CartState'
function SellerApp() {
  return (
    <SellerAuthState>
      <CartState>
        <Header />
        <Outlet />
      </CartState>
    </SellerAuthState>
  )
}

export default SellerApp
