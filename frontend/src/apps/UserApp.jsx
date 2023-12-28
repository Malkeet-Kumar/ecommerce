import Header from '../components/userComponents/header/index'
import { Outlet } from 'react-router-dom'
import UserAuthState from '../states/userAuthState'
import CartState from '../states/CartState'
function UserApp() {
  return (
    <UserAuthState>
      <CartState>
        <Header />
        <Outlet />
      </CartState>
    </UserAuthState>
  )
}

export default UserApp
