import Header from '../components/userComponents/header/index'
import { Navigate, Outlet } from 'react-router-dom'
import UserAuthState from '../states/userAuthState'
import CartState from '../states/CartState'
import { useContext } from 'react'
import UserContext from '../context/userContext'

const Child = () => {
  const { user } = useContext(UserContext)
  return (
    <>
      {
        (user?.isUser) ?
          <CartState>
            <Header />
            <Outlet />
          </CartState> :
          <h1>Please Logout from other session</h1>
      }
    </>
  )
}

function UserApp() {
  return (
    <UserAuthState>
      <Child />
    </UserAuthState>
  )
}

export default UserApp
